const Backbone = require('backbone');
const _ = require('underscore');
const OverlayScrollbars = require('overlayscrollbars').OverlayScrollbars;

require('@/system/plugins/accordion.js');

const Templates = {
    sidebar: require('@/templates/application/sidebar.html'),
};

module.exports = Backbone.View.extend({
    className: 'sidebar sidebar-fixed',
    tagName: 'sidebar',
    template: _.template(Templates.sidebar),
    selectors: {
        cart: '.shop-navigation-cart',
        user: '',
    },
    events: {
        'before_open_section .accordion-wraper' : function(section) {
            this.toggleSelected();
        },
        'click a': function (e) {
            // Get the href attribute
            let element = this.$(e.currentTarget);
            // Navigate to order details
            window.$app.helpers.navigate(element.attr('href'), true);
            e.preventDefault();
            e.stopPropagation();
        },
        'click .sidebar-footer a': function (e) {
            // Get the href attribute
            let element = this.$(e.currentTarget);
            window.location.href = element.attr('href');
            e.preventDefault();
            e.stopPropagation();
        },
    },
    heightCalculator: function (elem) {
        // Get offset top and calculate height
        let offsetTop = elem[0].offsetTop;
        let footerHeight = this.$('.sidebar-footer')[0].clientHeight;
        let height = document.documentElement.clientHeight - (offsetTop + footerHeight);
        return height;
    },
    defineHeight: function () {
        // Set the height
        this.sidebarScrollableArea.height(this.heightCalculator(this.sidebarScrollableArea));
    },
    toggleSelected : function(url = false) {
        this.activePanel = this.$('.panel_active .sidebar-navigation-child_list li');
        //
        // Check each sidebar navigation and remove/close the selected nav
        //
        _.each(this.activePanel,
            function (item, index) {
                let link = this.$(item).find('a');
                link.removeClass('active');
                if (link.attr('href')==url) {
                    link.addClass('active');
                }
            },
            this
        );
    },
    toggleChild: function () {
        //
        // Check each sidebar navigation and remove/close the selected nav
        //
        _.each(
            this.$('.sidebar-navigation-item'),
            function (item, index) {
                //
                // Close the panel and hide the child
                //
                this.$(item).removeClass('panel_active');
                this.childNavs = this.$(item).find('.sidebar-navigation-child');
                this.childNavs.hide();
                //
                // If the selected controller find it and open the child nav.
                //
                if (this.$(item).data('id') == this.primaryController) {
                    this.activeNav      = this.$(item);
                    this.activeNavChild = this.activeNav.find('.sidebar-navigation-toggle');
                    //
                    // If this nav has childs trigger a click to open the child navs
                    //
                    if (this.activeNavChild.length == 0) {
                        // Just add the active class
                        this.activeNav.addClass('panel_active');
                    } else {
                        this.activeNavChild.trigger('click');
                    }
                }
            },
            this
        );
    },
    update: function (route) {
        
        let toggleChild = true;
        
        // Prevent toggle sidebar
        if (this.primaryController) {
            if (route.controller[0] == this.primaryController) {
                toggleChild = false;
            }
        }

        if (toggleChild) {
            this.primaryController = route.controller[0];
            this.toggleChild();
        }
        
    },

    // Render widget
    render: function () {
        
        // Render the template
        this.$el.html(
            this.template({
                helpers: window.$app.helpers,
                navs: this.sidebarData,
            })
        );

        // Define the scrollable area
        this.sidebarScrollableArea = this.$('.sidebar-scrollable-area');
        
        // Init custom scrollbar
        OverlayScrollbars(this.sidebarScrollableArea[0], {
            overflow: {
                x: 'hidden',
            },
            scrollbars: {
                visibility: 'auto',
                autoHide: 'move',
            },
        });

        // Init the accordions
        this.$('.accordion-wraper').collapsible({
            closeAble: true,
            activeIndex: false,
            slideSpeed: 10,
        });
        
        return this;
        
    }
});
