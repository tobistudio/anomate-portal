/**
 * TextArea editor
 */

const Form      = require('@/system/forms/base');

module.exports = Form.editors.Text.extend({
    tagName: 'textarea',
    /**
     * Override Text constructor so type property isn't set (issue #261)
     */
    initialize: function (options) {
        Form.editors.Base.prototype.initialize.call(this, options);
    }
});