/*
 *
 *
 */
const _                     = require('underscore');
const CampaignsCollection   = require('@/collections/campaigns');
const StatsCollection       = require('@/collections/stats');
const Layout                = require('@/views/campaigns/default');
const htmlWidget            = require('@/widgets/html');

module.exports = function (params) {
    
    let that = this;

    //
    // Define base view
    //
    that.view = new Layout();
    that.view.render();

    //
    //
    that.availabileCampaigns = new CampaignsCollection();

    // Get Campaigns
    that.availabileCampaigns.fetch().then(function (response) {
        that.renderAvailableCampaignsList(response);
    });

    // Render campaigns stats
    that.renderAvailableCampaignsList = function (response) {
        
        let dataSet = [];

        that.availabileCampaigns.each(function (model, id) {
            let temp = [
                window.$app.helpers.campaignsName(model),
                window.$app.helpers.cmpStatus(model.get('status')),
                window.$app.helpers.dateFormat(model.get('date')),
                window.$app.helpers.calcPercentage(
                    model.get('impressions'),
                    model.get('emails_sent')
                ),
                window.$app.helpers.calcPercentage(
                    model.get('engagements'),
                    model.get('emails_sent')
                ),
                model.get('emails_sent'),
            ];
            dataSet.push(temp);
        });

        that.view.$('.data-table').DataTable({
            scrollY: '288px',
            scrollCollapse: true,
            paging: false,
            searching: false,
            info: false,
            order: [],
            data: dataSet,
            columnDefs: [
                {
                    width: '30%',
                    targets: 0,
                },
            ],
            columns: [
                {
                    title: 'Campaign Name',
                },
                {
                    title: 'Status',
                },
                {
                    title: 'Created',
                },
                {
                    title: 'Impressions',
                },
                {
                    title: 'Engagements',
                },
                {
                    title: 'Emails sent',
                },
            ],
        });
    };

    //
    //
    that.campaigns = new CampaignsCollection();

    // Get Campaigns
    that.campaigns.fetch({
        data: {
            available: 1,
        },
    })
    .then(function (response) {
        that.renderCampaignsList();
    });

    //
    that.renderCampaignsList = function () {
        let widgetTPL = require('@/templates/snippets/campaign.html');
        that.campaigns.each(function (model, id) {
            that.htmlWidget = new htmlWidget({
                className: 'column-md-3 card card-cmp-page',
                model: model,
            });
            that.htmlWidget.template = widgetTPL;
            that.htmlWidget.$el.appendTo(that.view.$('.section-campigns-list'));
            that.htmlWidget.render();
        });
    };

    return this;
};
