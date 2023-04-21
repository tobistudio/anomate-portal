const Backbone = require('backbone');
const _ = require('underscore');
const Template = require('@/templates/snippets/stats.html');

module.exports = Backbone.View.extend({
    className: 'column-md-6 widget-small',
    tagName: 'div',
    initialize: function () {},
    events: {},
    // Render widget
    render: function () {
        this.template = _.template(Template);
        this.$el.html(
            this.template({
                model: this.model,
            })
        );
        return this;
    },
});
