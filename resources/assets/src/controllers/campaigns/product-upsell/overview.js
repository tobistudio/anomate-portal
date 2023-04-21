/*
 *
 *
 */
const _                      = require('underscore');
const CampaignsCollection    = require('@/collections/campaigns');
const StatsCollection        = require('@/collections/stats');
const Layout                 = require('@/views/campaigns/product-upsell/overview');
const htmlWidget             = require('@/widgets/html');
const ChartWidget            = require('@/widgets/charts/chart');
const TableWidget            = require('@/widgets/table');

module.exports = function (context) {
    
    let that = this;
    
    //
    // Define base view
    //
    this.view = new Layout({model:context.campaign});
    this.view.render();
    
    //
    // Render chart
    //
    that.campaignStatsRender = function(response) {
        // Insert the canvas element inside the chart container.
        let widget = new TableWidget({
            type : 'scatter',
            header : {
                title  : "<h3>Total impressions</h3>",
                label  : "<span>Label</span>"
            },
            showLabels: true,
            label: {
                position: "top",
                direction: "end",
            },
            dateFilter: true,
            data : response
        }).render();
        this.view.$('#holder-campaign-performance').html(widget.$el);
    };
    
    this.campaignStats = new StatsCollection();
    this.campaignStats.fetch().then(function(response){
        that.campaignStatsRender(response);
    });

    //
    // Render chart
    //
    that.campaignEmailsStatsRender = function(response) {
        
        // Insert the canvas element inside the chart container.
        let widget = new ChartWidget({
            type : 'scatter',
            header : {
                title  : "<h3>Total emails sent</h3>",
                label  : "<span>Label </span>"
            },
            showLabels: true,
            label: {
                position: "top",
                direction: "end",
            },
            dateFilter: true,
            data : {
                "labels": [
                    "15 Jan",
                    "16 Jan",
                    "17 Jan",
                    "18 Jan",
                    "19 Jan",
                    "20 Jan",
                    "21 Jan"
                ],
                "datasets":[
                  {
                      "type":"line",
                      "label": "Line Dataset",
                      "data": [10, 20, 30, 40, 50, 40, 30, 20],
                      "fill": false,
                      "backgroundColor": "#9254DE",
                      "borderColor": "#9254DE"
                  },
                  {
                      "type": "bar",
                      "label": "Bar Dataset",
                      "data": [10, 20, 25, 20, 30, 40, 35, 10],
                      "borderColor": "rgb(255, 99, 132)",
                      "backgroundColor": "#4BD4FB"
                  }
                ]
            }
        }).render();
        this.view.$('#holder-email-performance').html(widget.$el);
    };
    
    this.campaignEmailsStats = new StatsCollection();
    this.campaignEmailsStats.fetch().then(function(response){
        that.campaignEmailsStatsRender(response);
    });

    //
    // Render chart
    //
    that.automatedEmailsRender = function(response) {
        
        // Insert the canvas element inside the chart container.
        let widget = new TableWidget({
            type : 'scatter',
            header : {
                title  : "<h3>Automated emails</h3>",
                label  : "<span>Label description goes here </span>"
            },
            labels : true,
            data : response
        }).render();
        
        this.view.$('#holder-automated-emails').html(widget.$el);
    };
    
    this.automatedEmails = new StatsCollection();
    this.automatedEmails.fetch().then(function(response){
        that.automatedEmailsRender(response);
    });
    
    //
    // Render chart
    //
    that.userLocationRender = function(response) {
        // Insert the canvas element inside the chart container.
        let widget = new TableWidget({
            type : 'scatter',
            header : {
                title  : "<h3>User location</h3>",
                label  : "<span>Latest activity </span>"
            },
            labels : true,
            data : response
        }).render();
        
        this.view.$('#holder-user-location').html(widget.$el);
    };
    
    this.userLocation = new StatsCollection();
    this.userLocation.fetch().then(function(response){
        that.userLocationRender(response);
    });
    
    return this;
    
};
