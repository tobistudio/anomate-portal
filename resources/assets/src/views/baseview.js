const Backbone          = require('backbone');
const _                 = require('underscore');
const OverlayScrollbars = require('overlayscrollbars').OverlayScrollbars;

const Container         = require('@/views/application/container');
const Header            = require('@/views/application/header');
const Sidebar           = require('@/views/application/sidebar');
const NavigationData    = require('@/configs/navigation');
const Breadcrumb        = require('@/views/application/breadcrumb');
const Modals            = require('@/views/application/modals');

module.exports = function () {
    
    let that = this;

    // Define user
    this.user = window.$app.session.user;

    // Define base view and init
    this.view = Backbone.View.extend({ el: window.$app.container });
    this.view = new this.view();
    this.view.$el.html('');
    this.view.render();
    
    this.modals = new Modals();
    this.modals.render();
    this.modals.$el.appendTo(this.view.$el);
    
    // Init application header and append to view.
    this.header = new Header();
    this.header.user = this.user;
    this.header.$el.appendTo(this.view.$el);
    this.header.render();

    // Init application header and append to view.
    this.sidebar = new Sidebar();
    
    _.each(
        NavigationData,
        function (nav) {
            if (nav.url == 'campaigns') {
                nav.child = this.user.get('campaigns');
            }
        },
        this
    );
    
    this.sidebar.sidebarData = NavigationData;
    this.sidebar.$el.appendTo(this.view.$el);
    this.sidebar.render();
    this.sidebar.defineHeight();

    // Add breadcrumb
    this.breadcrumb = new Breadcrumb();
    this.breadcrumb.navigationData = NavigationData;
    this.breadcrumb.$el.prependTo(this.header.$el);

    this.user.on(
        'sync',
        function () {
            this.header.render();
            this.breadcrumb.$el.prependTo(this.header.$el);
        },
        this
    );

    // Init application container and append to view.
    this.container = new Container();
    this.container.$el.appendTo(this.view.$el);
    this.container.render();

    // Init functions
    this.init = function () {
        
    };

    // Prepare temporary order to add to cart
    window.$app.signals.system.on(
        'update-navigations',
        function (route) {
            this.breadcrumb.update(route);
            this.sidebar.update(route);
            this.sidebar.toggleSelected(this.breadcrumb.path);
        },
        this
    );

    // Global Events
    Backbone.$(window).resize(function () {
        that.sidebar.defineHeight();
    });

    // On table pre init start the custom scrollbar
    Backbone.$(document).on('preInit.dt', function () {
        Backbone.$('.dataTables_scrollBody').each(function () {
            // On data table start replace the scrollbar style
            OverlayScrollbars(this, {
                overflow: {
                    x: 'hidden',
                },
                scrollbars: {
                    visibility: 'auto',
                    autoHide: 'move',
                },
            });
        });
    });
    
};
