/**
 * Radio editor
 *
 * Renders a <ul> with given options represented as <li> objects containing radio buttons
 *
 * Requires an 'options' value on the schema.
 *  Can be an array of options, a function that calls back with the array of options, a string of HTML
 *  or a Backbone collection. If a collection, the models must implement a toString() method
 */
const $                 = require('jquery');
const Backbone          = require('backbone');
const _                 = require('underscore');
const Form              = require('@/system/forms/base');
const TemplateSettings  = require('@/system/forms/templates/settings');

module.exports = Form.editors.Select.extend(
    {
        className: 'form-control-radio',
        tagName: 'div',
        events: {
            'change input[type=radio]': function () {
                this.trigger('change', this);
            },
            'focus input[type=radio]': function () {
                if (this.hasFocus) return;
                this.trigger('focus', this);
            },
            'blur input[type=radio]': function () {
                if (!this.hasFocus) return;
                let self = this;
                setTimeout(function () {
                    if (self.$('input[type=radio]:focus')[0]) return;
                    self.trigger('blur', self);
                }, 0);
            },
        },

        /**
         * Returns the template. Override for custom templates
         *
         * @return {Function}       Compiled template
         */
        getTemplate: function () {
            return this.schema.template || this.constructor.template;
        },

        getValue: function () {
            return this.$('input[type=radio]:checked').val();
        },

        setValue: function (value) {
            this.value = value;
            this.$('input[type=radio]').val([value]);
        },

        focus: function () {
            if (this.hasFocus) return;

            let checked = this.$('input[type=radio]:checked');
            if (checked[0]) {
                checked.focus();
                return;
            }

            this.$('input[type=radio]').first().focus();
        },

        blur: function () {
            if (!this.hasFocus) return;

            this.$('input[type=radio]:focus').blur();
        },

        /**
         * Create the radio list HTML
         * @param {Array}   Options as a simple array e.g. ['option1', 'option2']
         *                      or as an array of objects e.g. [{val: 543, label: 'Title for object 543'}]
         * @return {String} HTML
         */
        _arrayToHtml: function (array) {
            let self = this;

            let template = this.getTemplate(),
                name = self.getName(),
                id = self.id;

            let items = _.map(array, function (option, index) {
                let item = {
                    name: name,
                    id: id + '-' + index,
                };

                if (_.isObject(option)) {
                    item.value = option.val || option.val === 0 ? option.val : '';
                    item.label = option.label;
                    item.labelHTML = option.labelHTML;
                } else {
                    item.value = option;
                    item.label = option;
                }

                return item;
            });

            return template({ items: items });
        },
    },
    {
        //STATICS
        template: _.template(
            '<% _.each(items, function(item) { %>' +
                '<div class="radio-inline">' +
                    '<label for="<%= item.id %>">' +
                        '<input type="radio" name="<%= item.name %>" id="<%= item.id %>" value="<%= item.value %>" checked>' +
                        '<span class="checkmark"></span>'+
                        '<% if (item.labelHTML){ %>'+
                            '<%= item.labelHTML %>'+
                        '<% } else { %>'+
                            '<%= item.label %>'+
                        '<% } %>' +
                    '</label>' +
                '</div>' +
            '<% }); %>',
            null,
            TemplateSettings
        ),
    }
);