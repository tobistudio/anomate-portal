const Backbone              = require('backbone');
const _                     = require('underscore');
const UserModel             = require('@/models/user');
const CampaignsCollection   = require('@/collections/campaigns');

module.exports = function () {
    
    let that = this;

    // Define the order model
    this.user = new UserModel();

    // Initialize the service
    this.init = function () {
        this.syncUser();
    };

    //
    // If an active order is present in localstorage
    // Synchronize with the api to validate the present order
    //
    this.syncUser = function () {
        // define sync endpoint
        this.user.fetch().then(function (response) {
            that.syncCampaigns();
        });
    };

    this.buildSidebarNav = function (response) {
        
        let campaignsNav = [];

        _.each(
            response,
            function (cmp) {
                
                // Define the order
                cmp.order = '1';
                
                if (cmp.status == 'pending' || cmp.status == 'unavailable') {
                    cmp.order = '2';
                }
                
                campaignsNav.push({
                    name: cmp.campaign_name,
                    url: 'campaigns/single?id=' + cmp.id,
                    order: cmp.order,
                });
                
            },
            this
        );

        return _.sortBy(campaignsNav, 'order');
        
    };

    // Sync campaigns
    this.syncCampaigns = function () {
        
        //
        //
        that.campaigns = new CampaignsCollection();
        
        // Get Campaigns
        that.campaigns.fetch({
            data: { all:1 },
        }).then(function (response) {
            that.user.set('campaigns',that.buildSidebarNav(response));
            // Triggera global signal to tell that the order in local storage is updated from the api
            window.$app.signals.system.trigger('user-sync',response);
        });
        
    };

    //
    return this;
};
