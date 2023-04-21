// Dependecies
const Backbone          = require('backbone');
const _                 = require('underscore');
const Form              = require('@/system/forms/base');
const TemplateSettings  = require('@/system/forms/templates/settings');

const Templates = {
    Checkbox:_.template(
        '<div class="form-group checkbox-inline field-<%= key %>">' +
            '<label class="control-label" for="<%= editorId %>">' +
                '<% if (title){ %>' +
                    '<%= title %>' +
                '<% } %>' +
                '<div class="field clearfix" data-editor>'+
                    '<span class="checkmark"></span>'+
                '</div>'+
                '<% if (help) { %>'+
                    '<p class="help-block"><%= help %></p>'+
                '<% } %>'+
                '<p class="help-block help-error" data-error></p>'+
            '</label>' +
        '</div>',
        null,
        TemplateSettings
    ),
    Text: _.template(
        '<div class="form-group field-<%= key %>">' +
            '<% if (title){ %>' +
                '<label class="control-label" for="<%= editorId %>">' +
                    '<%= title %>' +
                '</label>' +
            '<% } %>' +
            '<% if (titleHTML){ %>' +
                '<%= titleHTML %>' +
            '<% } %>' +
            '<div class="field-container">'+
                '<% if (help) { %>'+
                    '<p class="help-block"><%= help %></p>'+
                '<% } %>'+
                '<% if (editorAttrs&&editorAttrs.addon) { %>'+
                    '<div class="field input-group" data-editor>'+
                        '<span class="input-group-addon"><%= editorAttrs.addon %></span>'+
                    '</div>'+
                '<% } else { %>'+
                    '<div class="field clearfix" data-editor></div>'+
                '<% } %>'+
                '<p class="help-block help-error" data-error></p>'+
            '</div>'+
        '</div>',
        null,
        TemplateSettings
    ),
};


module.exports = Backbone.View.extend(
    {
        /**
         * Constructor
         *
         * @param {Object} options.key
         * @param {Object} options.form
         * @param {Object} [options.schema]
         * @param {Function} [options.schema.template]
         * @param {Backbone.Model} [options.model]
         * @param {Object} [options.value]
         * @param {String} [options.idPrefix]
         * @param {Function} [options.template]
         * @param {Function} [options.errorClassName]
         */
        initialize: function (options) {
            
            options = options || {};

            //Store important data
            _.extend(this, _.pick(options, 'form', 'key', 'model', 'value', 'idPrefix'));
            
            //Create the full field schema, merging defaults etc.
            let schema = (this.schema = this.createSchema(options.schema));
            
            // Default template
            this.template =  this.constructor.template;
            
            if (Templates[options.schema.type]!=undefined) {
                this.template = Templates[options.schema.type];
            }
            
            this.template = options.template || schema.template || this.template;
            this.errorClassName = options.errorClassName || schema.errorClassName || this.errorClassName || this.constructor.errorClassName;

            //Create editor
            this.editor = this.createEditor();
            
        },

        /**
         * Creates the full field schema, merging defaults etc.
         *
         * @param {Object|String} schema
         *
         * @return {Object}
         */
        createSchema: function (schema) {
            if (_.isString(schema)) schema = { type: schema };

            //Set defaults
            schema = _.extend(
                {
                    type: 'Text',
                    title: this.createTitle(),
                },
                schema
            );

            // Get the real constructor function i.e. if type is a string such as 'Text'
            schema.type = _.isString(schema.type) ? Form.editors[schema.type] : schema.type;

            return schema;
        },

        /**
         * Creates the editor specified in the schema; either an editor string name or
         * a constructor function
         *
         * @return {View}
         */
        createEditor: function () {
            
            let options = _.extend(_.pick(this, 'schema', 'form', 'key', 'model', 'value'), {
                id: this.createEditorId(),
            });
            
            let constructorFn = this.schema.type;
            
            return new constructorFn(options);
        },

        /**
         * Creates the ID that will be assigned to the editor
         *
         * @return {String}
         */
        createEditorId: function () {
            let prefix = this.idPrefix,
                id = this.key;

            //Replace periods with underscores (e.g. for when using paths)
            id = id.replace(/\./g, '_');

            //If a specific ID prefix is set, use it
            if (_.isString(prefix) || _.isNumber(prefix)) return prefix + id;
            if (_.isNull(prefix)) return id;

            //Otherwise, if there is a model use it's CID to avoid conflicts when multiple forms are on the page
            if (this.model) return this.model.cid + '_' + id;

            return id;
        },

        /**
         * Create the default field title (label text) from the key name.
         * (Converts 'camelCase' to 'Camel Case')
         *
         * @return {String}
         */
        createTitle: function () {
            let str = this.key;

            //Add spaces
            str = str.replace(/([A-Z])/g, ' $1');

            //Uppercase first character
            str = str.replace(/^./, function (str) {
                return str.toUpperCase();
            });

            return str;
        },

        /**
         * Returns the data to be passed to the template
         *
         * @return {Object}
         */
        templateData: function () {
            
            let schema = this.schema;
            
            return {
                help: schema.help || '',
                title: schema.title,
                titleHTML: schema.titleHTML,
                fieldAttrs: schema.fieldAttrs,
                editorAttrs: schema.editorAttrs,
                key: this.key,
                editorId: this.editor.id,
            };
            
        },

        /**
         * Render the field and editor
         *
         * @return {Field} self
         */
        render: function () {
            
            let schema = this.schema;
            let editor = this.editor;
            let $ = Backbone.$;
            
            // Only render the editor if requested
            if (this.editor.noField === true) {
                return this.setElement(editor.render().el);
            }
            
            //Render field
            let $field = $($.trim(this.template(_.result(this, 'templateData'))));
            
            if (schema.fieldClass) {
                $field.addClass(schema.fieldClass);
            }
            
            if (schema.fieldAttrs) {
                $field.attr(schema.fieldAttrs);
            }
            
            //Render editor
            $field
                .find('[data-editor]')
                .add($field)
                .each(function (i, el) {
                    let $container = $(el),
                        selection = $container.attr('data-editor');

                    if (_.isUndefined(selection)) return;

                    $container.prepend(editor.render().el);
                });

            this.setElement($field);

            return this;
        },

        /**
         * Disable the field's editor
         * Will call the editor's disable method if it exists
         * Otherwise will add the disabled attribute to all inputs in the editor
         */
        disable: function () {
            if (_.isFunction(this.editor.disable)) {
                this.editor.disable();
            } else {
                $input = this.editor.$el;
                $input = $input.is('input') ? $input : $input.find('input');
                $input.attr('disabled', true);
            }
        },

        /**
         * Enable the field's editor
         * Will call the editor's disable method if it exists
         * Otherwise will remove the disabled attribute to all inputs in the editor
         */
        enable: function () {
            if (_.isFunction(this.editor.enable)) {
                this.editor.enable();
            } else {
                $input = this.editor.$el;
                $input = $input.is('input') ? $input : $input.find('input');
                $input.attr('disabled', false);
            }
        },

        /**
         * Check the validity of the field
         *
         * @return {String}
         */
        validate: function () {
            let error = this.editor.validate();

            if (error) {
                this.setError(error.message);
            } else {
                this.clearError();
            }

            return error;
        },

        /**
         * Set the field into an error state, adding the error class and setting the error message
         *
         * @param {String} msg     Error message
         */
        setError: function (msg) {
            //Nested form editors (e.g. Object) set their errors internally
            if (this.editor.hasNestedForm) return;

            //Add error CSS class
            this.$el.addClass(this.errorClassName);

            //Set error message
            this.$('[data-error]').last().html(msg);
        },

        /**
         * Clear the error state and reset the help message
         */
        clearError: function () {
            //Remove error CSS class
            this.$el.removeClass(this.errorClassName);

            //Clear error message
            this.$('[data-error]').empty();
        },

        /**
         * Update the model with the new value from the editor
         *
         * @return {Mixed}
         */
        commit: function () {
            return this.editor.commit();
        },

        /**
         * Get the value from the editor
         *
         * @return {Mixed}
         */
        getValue: function () {
            return this.editor.getValue();
        },

        /**
         * Set/change the value of the editor
         *
         * @param {Mixed} value
         */
        setValue: function (value) {
            this.editor.setValue(value);
        },

        /**
         * Give the editor focus
         */
        focus: function () {
            this.editor.focus();
        },

        /**
         * Remove focus from the editor
         */
        blur: function () {
            this.editor.blur();
        },

        /**
         * Remove the field and editor views
         */
        remove: function () {
            this.editor.remove();

            Backbone.View.prototype.remove.call(this);
        },
    },
    {
        //STATICS
        template: _.template(
            '<div class="form-group field-<%= key %>">' +
                '<% if (title){ %>' +
                    '<label class="control-label" for="<%= editorId %>">' +
                        '<%= title %>' +
                    '</label>' +
                '<% } %>' +
                '<% if (titleHTML){ %>' +
                    '<%= titleHTML %>' +
                '<% } %>' +
                '<div class="field-container">'+
                    '<% if (help) { %>'+
                        '<p class="help-block"><%= help %></p>'+
                    '<% } %>'+
                    '<div class="field clearfix" data-editor></div>'+
                    '<p class="help-block help-error" data-error></p>'+
                '</div>'+
            '</div>',
            null,
            TemplateSettings
        ),
        /**
         * CSS class name added to the field when there is a validation error
         */
        errorClassName: 'has-error',
    }
);