const Backbone = require('backbone');
const _ = require('underscore');

module.exports = Backbone.View.extend({
    tagName: 'div',
    // Render widget
    render: function () {
        this.template = _.template(this.template);
        this.$el.html(
            this.template({
                model: this.model,
            })
        );
        return this;
    },
});
