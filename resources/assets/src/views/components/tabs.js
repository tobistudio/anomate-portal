const Backbone  = require('backbone');
const _         = require('underscore');
const Template  = require('@/templates/components/tabs.html');

module.exports = Backbone.View.extend({
    className: 'row',
    tagName: 'div',
    initialize: function (options) {
        
    },
    events: {
        'click a': function (e) {
            // Get the href attribute
            let element = this.$(e.currentTarget);
            // Navigate to order details
            window.$app.helpers.navigate(element.attr('href'), true);
            e.preventDefault();
            e.stopPropagation();
        },
    },
    // Render widget
    render: function () {
        this.template = _.template(Template);
        this.templateData = {helpers: window.$app.helpers};
        if (this.tabs) {
            this.templateData.tabs = this.tabs;
        }
        this.$el.html(this.template(this.templateData));
        return this;
    },
});
