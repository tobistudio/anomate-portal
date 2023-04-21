
/**
 * Password editor
 */
const Form  = require('@/system/forms/base');

module.exports = Form.editors.Text.extend({
    initialize: function (options) {
        Form.editors.Text.prototype.initialize.call(this, options);
        this.$el.attr('type', 'password');
        this.$el.attr('autocomplete', 'on');
    },
});