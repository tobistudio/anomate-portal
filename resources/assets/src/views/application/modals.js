const Backbone = require('backbone');
const _ = require('underscore');

const Templates = {
    layout: require('@/templates/application/modals/layout.html'),
};

module.exports = Backbone.View.extend({
    className: 'modals',
    tagName: 'div',
    initialize: function () {
        
    },
    // Render widget
    render: function (html) {
        
        this.template = _.template(Templates.layout);
        this.$el.html(this.template());
        
        this.body = this.$('.modal-content');
        
        return this;
    },
});
