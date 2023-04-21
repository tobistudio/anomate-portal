
/**
 * Text
 *
 * Text input with focus, blur and change events
 */
 
const Form = require('@/system/forms/base');

module.exports = Form.Editor.extend({
    tagName: 'input',
    defaultValue: '',
    previousValue: '',
    events: {
        keyup: 'determineChange',
        keypress: function (event) {
            let self = this;
            setTimeout(function () {
                self.determineChange();
            }, 0);
        },
        select: function (event) {
            this.trigger('select', this);
        },
        focus: function (event) {
            this.trigger('focus', this);
        },
        blur: function (event) {
            this.trigger('blur', this);
        },
    },

    initialize: function (options) {
        
        Form.editors.Base.prototype.initialize.call(this, options);

        let schema = this.schema;

        //Allow customising text type (email, phone etc.) for HTML5 browsers
        let type = 'text';

        if (schema && schema.editorAttrs && schema.editorAttrs.type) type = schema.editorAttrs.type;
        if (schema && schema.dataType) type = schema.dataType;

        this.$el.attr('type', type);
        
    },

    /**
     * Adds the editor to the DOM
     */
    render: function () {
        this.setValue(this.value);

        return this;
    },

    determineChange: function (event) {
        let currentValue = this.$el.val();
        let changed = currentValue !== this.previousValue;

        if (changed) {
            this.previousValue = currentValue;

            this.trigger('change', this);
        }
    },

    /**
     * Returns the current editor value
     * @return {String}
     */
    getValue: function () {
        return this.$el.val();
    },

    /**
     * Sets the value of the form element
     * @param {String}
     */
    setValue: function (value) {
        this.value = value;
        this.$el.val(value);
    },

    focus: function () {
        if (this.hasFocus) return;

        this.$el.focus();
    },

    blur: function () {
        if (!this.hasFocus) return;

        this.$el.blur();
    },

    select: function () {
        this.$el.select();
    },
});