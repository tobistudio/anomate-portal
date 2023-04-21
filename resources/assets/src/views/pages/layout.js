const Backbone = require('backbone');
const _ = require('underscore');
const Template = require('@/templates/pages.html');

module.exports = Backbone.View.extend({
    className: 'row',
    tagName: 'div',
    initialize: function () {},
    events: {
        'click a': function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
    },
    // Render widget
    render: function () {
        this.template = _.template(Template);
        this.$el.html(this.template());
        return this;
    },
});
