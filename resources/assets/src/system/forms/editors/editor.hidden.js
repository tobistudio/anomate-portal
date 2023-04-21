/**
 * Hidden editor
 */
const $     = require('jquery');
const Form  = require('@/system/forms/base');

module.exports = Form.editors.Text.extend({
    defaultValue: '',
    noField: true,
    initialize: function (options) {
        Form.editors.Text.prototype.initialize.call(this, options);

        this.$el.attr('type', 'hidden');
    },
    focus: function () {},
    blur: function () {},
});