/*
 *
 *
 */

const _ = require('underscore');
const Tabs = require('@/views/components/tabs');

module.exports = function (params) {
    
    let that = this;
    
    // Default controller
    this.params     = params;
    this.controller = 'profile';

    //
    // Define base view
    //
    this.view = new Tabs();

    if (params.controller && params.controller[1]) {
        this.controller = params.controller[1];
    }

    switch (this.controller) {
        case 'settings':
            // Tabs Config
            this.tabs = [
                {
                    id: 'email-settings',
                    name: 'Email settings',
                    url: 'user/' + this.controller + '?tab=email-settings',
                    controller: require('@/controllers/user/settings/email-settings'),
                },
                {
                    id: 'brand-information',
                    name: 'Brand information',
                    url: 'user/' + this.controller + '?tab=brand-information',
                    controller: require('@/controllers/user/settings/brand-information'),
                },
                {
                    id: 'domain-verification',
                    name: 'Domains & Accounts',
                    url: 'user/' + this.controller + '?tab=domain-verification',
                    controller: require('@/controllers/user/settings/domain-verification'),
                },
                {
                    id: 'users',
                    name: 'Users',
                    url: 'user/' + this.controller + '?tab=users',
                    controller: require('@/controllers/user/settings/users'),
                },
            ];
            break;
        case 'billing':
            // Tabs Config
            this.tabs = [
                {
                    id: 'payment-information',
                    name: 'Payment information',
                    url: 'user/' + this.controller + '?tab=payment-information',
                    controller: require('@/controllers/user/billing/payment-information'),
                },
                {
                    id: 'packages',
                    name: 'Packages',
                    url: 'user/' + this.controller + '?tab=packages',
                    controller: require('@/controllers/user/billing/packages'),
                },
                {
                    id: 'invoices',
                    name: 'Invoices',
                    url: 'user/' + this.controller + '?tab=invoices',
                    controller: require('@/controllers/user/billing/invoices'),
                },
            ];
            break;
        case 'support':
            // Tabs Config
            this.tabs = [
                {
                    id: 'chat',
                    name: 'Chat',
                    url: 'user/' + this.controller + '?tab=chat',
                    controller: require('@/controllers/user/profile/details'),
                },
                {
                    id: 'tickets',
                    name: 'Tickets',
                    url: 'user/' + this.controller + '?tab=tickets',
                    controller: require('@/controllers/user/profile/details'),
                },
                {
                    id: 'contact',
                    name: 'Contact US',
                    url: 'user/' + this.controller + '?tab=contact',
                    controller: require('@/controllers/user/profile/details'),
                },
            ];
            break;
        default:
            // Tabs Config
            this.tabs = [
                {
                    id: 'details',
                    name: 'User details',
                    url: 'user/' + this.controller + '?tab=details',
                    controller: require('@/controllers/user/profile/details'),
                },
                {
                    id: 'two-factory',
                    name: 'Two-factor authentication',
                    url: 'user/' + this.controller + '?tab=two-factory',
                    controller: require('@/controllers/user/profile/two-factory'),
                },
            ];
    }

    // Tab toggle
    this.initTabs = function () {
        this.selectedTab = this.tabs[0];
        _.each(
            this.tabs,
            function (tab, index) {
                if (params.query) {
                    if (params.query.tab && params.query.tab == tab.id) {
                        this.selectedTab = this.tabs[index];
                    }
                }
            },
            this
        );
        this.selectedTab.className = 'active';
    };

    this.initTabs();

    // Set the tabs to the controller view
    // Render the view
    this.view.tabs = this.tabs;
    this.view.render();

    // Define child controller depending on the selected Tab
    this.initChildControler = function () {
        // Init the child controller for the tab content
        if (this.selectedTab.controller) {
            this.childController = new this.selectedTab.controller(this);
            this.view.$('#tabs-content').html(this.childController.view.$el);
        }
    };

    // Init child controller
    this.initChildControler();

    return this;
};
