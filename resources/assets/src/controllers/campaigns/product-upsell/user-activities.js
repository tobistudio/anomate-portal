/*
 *
 *
 */
const _                     = require('underscore');
const CampaignsCollection   = require('@/collections/campaigns');
const StatsCollection       = require('@/collections/stats');
const Layout                = require('@/views/campaigns/product-upsell/user-activities');
const htmlWidget            = require('@/widgets/html');

module.exports = function (context) {
    
    let that = this;
    
    //
    // Define base view
    //
    this.view = new Layout({model:context.campaign});
    this.view.render();
    
    return this;
    
};
