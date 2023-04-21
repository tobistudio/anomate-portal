const Backbone          = require('backbone');
const _                 = require('underscore');
const Template          = require('./timeline.html');
const OverlayScrollbars = require('overlayscrollbars').OverlayScrollbars;

module.exports = Backbone.View.extend({
    tagName: 'div',
    data: {
        header:{
            title  : "Timeline Widget",
            label  : "Label"
        },
        logs: []
    },
    initialize: function (config) {
        this.config = config;
        this.data.logs = this.config.logs
    },
    events: {},
    // Render widget
    render: function () {
        this.template = _.template(Template);

        this.$el.html(this.template(this.data));

        OverlayScrollbars(this.$('.timeline')[0], {
            overflow: {
                x: 'hidden',
            },
            scrollbars: {
                visibility: 'auto',
                autoHide: 'move',
            },
        });

        return this;
    },
});
