const Backbone = require('backbone');
const _ = require('underscore');
const Template = require('@/templates/campaigns.html');

module.exports = Backbone.View.extend({
    className: 'row',
    tagName: 'div',
    initialize: function () {},
    events: {
        'click a': function (e) {
            // Get the href attribute
            let element = this.$(e.currentTarget);
            // Navigate to order details
            window.$app.helpers.navigate(element.attr('href'), true);
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
