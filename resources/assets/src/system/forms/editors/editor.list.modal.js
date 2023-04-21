/**
 * Base modal object editor for use with the List editor; used by Object
 * and NestedModal list types
 */
const $         = require('jquery');
const Backbone  = require('backbone');
const Form      = require('@/system/forms/base');
const _         = require('underscore');

require('@/system/plugins/modal-adapter.js');

module.exports = Form.editors.Base.extend(
    {
        events: {
            click: function(e) {
                
            },
        },

        /**
         * @param {Object} options
         * @param {Form} options.form                       The main form
         * @param {Function} [options.schema.itemToString]  Function to transform the value for display in the list.
         * @param {String} [options.schema.itemType]        Editor type e.g. 'Text', 'Object'.
         * @param {Object} [options.schema.subSchema]       Schema for nested form,. Required when itemType is 'Object'
         * @param {Function} [options.schema.model]         Model constructor function. Required when itemType is 'NestedModel'
         */
        initialize: function (options) {
            options = options || {};

            Form.editors.Base.prototype.initialize.call(this, options);

            //Dependencies
            if (!Form.editors.List.Modal.ModalAdapter)
                throw new Error('A ModalAdapter is required');

            this.form = options.form;
            if (!options.form) throw new Error('Missing required option: "form"');

            //Template
            this.template = options.template || this.constructor.template;
        },

        /**
         * Render the list item representation
         */
        render: function () {
            let self = this;

            //New items in the list are only rendered when the editor has been OK'd
            if (_.isEmpty(this.value)) {
                this.openEditor();
            }

            //But items with values are added automatically
            else {
                this.renderSummary();

                setTimeout(function () {
                    self.trigger('readyToAdd');
                }, 0);
            }

            if (this.hasFocus) this.trigger('blur', this);

            return this;
        },

        /**
         * Renders the list item representation
         */
        renderSummary: function () {
            this.$el.html(
                $.trim(
                    this.template({
                        summary: this.getStringValue(),
                    })
                )
            );
        },

        /**
         * Function which returns a generic string representation of an object
         *
         * @param {Object} value
         *
         * @return {String}
         */
        itemToString: function (value) {
            value = JSON.stringify(value, null, '\t');
            return value;
        },

        /**
         * Returns the string representation of the object value
         */
        getStringValue: function () {
            
            let schema = this.schema, value = this.getValue();

            if (_.isEmpty(value)) {
                return '[Empty]';
            }
            
            // If there's a specified toString use that
            if (schema.itemToString) {
                return schema.itemToString(value,schema);
            }

            // Otherwise use the generic method or custom overridden method
            return this.itemToString(value);
        },

        openEditor: function () {
            
            let self = this, ModalForm = this.form.constructor;

            let form = (this.modalForm = new ModalForm({
                schema: this.nestedSchema,
                data: this.value,
            }));
            
            let modal = (this.modal = new Form.editors.List.Modal.ModalAdapter({
                title: this.schema.title,
                content: form,
                animate: true,
            }));

            modal.open();

            this.trigger('open', this);
            this.trigger('focus', this);

            modal.on('cancel', this.onModalClosed, this);
            modal.on('ok', _.bind(this.onModalSubmitted, this));
            
        },

        /**
         * Called when the user clicks 'OK'.
         * Runs validation and tells the list when ready to add the item
         */
        onModalSubmitted: function () {
            let modal = this.modal,
                form = this.modalForm,
                isNew = !this.value;

            //Stop if there are validation errors
            let error = form.validate();
            if (error) return modal.preventClose();
        
            //Store form value
            this.value = form.getValue();

            //Render item
            this.renderSummary();

            if (isNew) this.trigger('readyToAdd');

            this.trigger('change', this);

            this.onModalClosed();
        },

        /**
         * Cleans up references, triggers events. To be called whenever the modal closes
         */
        onModalClosed: function () {
            this.modal = null;
            this.modalForm = null;

            this.trigger('close', this);
            this.trigger('blur', this);
        },

        getValue: function () {
            return this.value;
        },

        setValue: function (value) {
            this.value = value;
        },

        focus: function () {
            if (this.hasFocus) return;

            this.openEditor();
        },

        blur: function () {
            if (!this.hasFocus) return;

            if (this.modal) {
                this.modal.trigger('cancel');
            }
        },
        
    },
    {
        //STATICS
        template: _.template(
            '<%= summary %>',
            null,
            Form.templateSettings
        ),

        //The modal adapter that creates and manages the modal dialog.
        //Defaults to BootstrapModal (http://github.com/powmedia/backbone.bootstrap-modal)
        //Can be replaced with another adapter that implements the same interface.
        ModalAdapter: Backbone.BootstrapModal,

        //Make the wait list for the 'ready' event before adding the item to the list
        isAsync: true,
    }
);