const Backbone  = require('backbone');
const _         = require('underscore');
const Template  = require('@/templates/widgets.html');
const moment    = require('moment');

module.exports = Backbone.View.extend({
    className: 'row',
    tagName: 'div',
    initialize: function (params) {

    },
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
        
        this.$el.html(this.template({
            helpers:window.$app.helpers
        }));
        
        return this;
    },
});
