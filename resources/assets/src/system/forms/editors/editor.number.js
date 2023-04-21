
/**
 * NUMBER
 *
 * Normal text input that only allows a number. Letters etc. are not entered.
 */
const Form  = require('@/system/forms/base');
const _     = require('underscore');

module.exports = Form.editors.Text.extend({
    defaultValue: '',
    events: _.extend({}, Form.editors.Text.prototype.events, {
        keypress: 'onKeyPress',
        change: 'onKeyPress',
    }),
    initialize: function (options) {
        Form.editors.Text.prototype.initialize.call(this, options);

        let schema = this.schema;

        this.$el.attr('type', 'number');

        if (!schema || !schema.editorAttrs || !schema.editorAttrs.step) {
            // provide a default for `step` attr,
            // but don't overwrite if already specified
            this.$el.attr('step', 'any');
        }
    },
    /**
     * Check value is numeric
     */
    onKeyPress: function (event) {
        let self = this,
            delayedDetermineChange = function () {
                setTimeout(function () {
                    self.determineChange();
                }, 0);
            };

        //Allow backspace
        if (event.charCode === 0) {
            delayedDetermineChange();
            return;
        }

        //Get the whole new value so that we can prevent things like double decimals points etc.
        let newVal = this.$el.val();
        if (event.charCode != undefined) {
            newVal = newVal + String.fromCharCode(event.charCode);
        }

        let numeric = /^[0-9]*\.?[0-9]*?$/.test(newVal);

        if (numeric) {
            delayedDetermineChange();
        } else {
            event.preventDefault();
        }
    },

    getValue: function () {
        let value = this.$el.val();

        return value === '' ? null : parseFloat(value, 10);
    },

    setValue: function (value) {
        value = (function () {
            if (_.isNumber(value)) return value;

            if (_.isString(value) && value !== '') return parseFloat(value, 10);

            return null;
        })();

        if (_.isNaN(value)) value = null;
        this.value = value;
        Form.editors.Text.prototype.setValue.call(this, value);
    },
});