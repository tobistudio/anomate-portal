const Backbone = require('backbone');
const _ = require('underscore');

const Templates = {
    breadcrumb: require('@/templates/application/breadcrumb.html'),
};

module.exports = Backbone.View.extend({
    className: 'breadcrumb',
    tagName: 'ol',
    template: _.template(Templates.breadcrumb),
    events: {
        'click a': function (e) {
            // Get the href attribute
            let element = this.$(e.currentTarget);
            let parent = element.parent();
            let toggle = parent.find('.sidebar-navigation-toggle');
            toggle.trigger('click');
            window.$app.helpers.navigate(element.attr('href'), true);
            e.preventDefault();
            e.stopPropagation();
        },
    },
    update: function(route) {
        
        // Define path
        this.path = route.controller[0];
        
        // Find the parent controller attribute in the sidebar data
        this.controller = _.findWhere(this.navigationData,{url:this.path});
        
        // Breadcumb data
        this.data = {
            home: '',
            controller: this.controller,
        };

        // Check if the second segment is defined...
        if (route.controller[1]) {
            this.path = route.controller[0] + '/' + route.controller[1];
            if (route.controller[1]=='single') {
                if (route.query&&route.query.id) {
                    this.path = route.controller[0] + '/single?id='+route.query.id;
                }
            }
            if (this.controller && this.controller.child) {
                this.method = _.findWhere(this.controller.child,{url:this.path});
                this.data.method = this.method;
            }
        }
        
        // Refresh breadcrumb
        this.render();
    },
    // Render widget
    render: function () {
        this.$el.html(
            this.template({
                data: this.data,
                helpers: window.$app.helpers,
            })
        );

        return this;
    },
});
