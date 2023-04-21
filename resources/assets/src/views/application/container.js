const Backbone = require('backbone');

module.exports = Backbone.View.extend({
    className: 'container-fluid',
    tagName: 'section',
    render: function () {
        this.$el.html('');
        return this;
    },
});