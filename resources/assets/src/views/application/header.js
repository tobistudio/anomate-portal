const Backbone = require('backbone');
const _ = require('underscore');
const Dropdown = require('@/system/plugins/dropdown');

const Templates = {
    header: require('@/templates/application/header.html'),
};

module.exports = Backbone.View.extend({
    className: 'header',
    tagName: 'header',
    template: _.template(Templates.header),
    events: {
        'click a': function (e) {
            
            let element = this.$(e.currentTarget);
            
            if (element.attr('href') != '#') {
                window.$app.helpers.navigate(element.attr('href'), true);
                if (element.data('link')=='user-nav') {
                    this.$('.dropdown-toggle').dropdown('toggle');
                }
                e.preventDefault();
                e.stopPropagation();
            }
            
        },
        'click a.dropdown-toggle': function (e) {
            this.$('.dropdown-toggle').dropdown('toggle');
            e.preventDefault();
            e.stopPropagation();
        },
    },
    // Render widget
    render: function () {
        this.$el.html(
            this.template({
                model: this.user,
                helpers: window.$app.helpers,
            })
        );
        this.$('.dropdown-toggle').dropdown();
        return this;
    },
});
