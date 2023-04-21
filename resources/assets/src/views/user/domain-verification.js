const Backbone = require('backbone');
const _ = require('underscore');
const Template = require('@/templates/users/domain-verification/layout.html');

module.exports = Backbone.View.extend({
    className: 'row',
    tagName: 'div',
    empty: false,
    template : _.template(Template),
    events: {
        'click a': function (e) {
            e.preventDefault();
            e.stopPropagation();
        },
    },
    // Render widget
    render: function () {
        this.$el.html(this.template({
            collection:this.collection   
        }));
        return this;
    },
});
