const Backbone = require('backbone');
const _ = require('underscore');

module.exports = Backbone.View.extend({
    className: 'row',
    tagName: 'div',
    events: {
        'click a': function (e) {
            e.preventDefault();
            e.stopPropagation();
        },
    },
    // Render widget
    render: function () {
        this.$el.html('');
        return this;
    },
});
