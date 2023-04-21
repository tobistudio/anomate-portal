/*
 *
 *
 */

const _ = require('underscore');

const CampaignsCollection   = require('@/collections/campaigns');
const StatsCollection       = require('@/collections/stats');
const TopSellingCollection  = require('@/collections/products');
const LogsCollection        = require('@/collections/logs');
const RevenueCollection     = require('@/collections/revenue');
const Helpers               = require('@/system/helpers');

const Layout                = require('@/views/home/layout');
const StatsView             = require('@/views/home/stats');
const ActivityView          = require('@/views/home/activity');
const OverlayScrollbars     = require('overlayscrollbars').OverlayScrollbars;

const ChartWidget           = require('@/widgets/charts/chart');
const TableWidget           = require('@/widgets/tables/table');
const TimelineWidget        = require('@/widgets/timelines/timeline');

module.exports = function (params) {

    let that = this;
    
    //
    // Define base view
    //

    this.initView = function () {
        that.view = new Layout(params);
        that.view.render();
    };
    
    //
    // Init campaigns stats
    //
    this.initStats = function () {
        that.stats = new StatsCollection();
        // Get Campaigns
        that.stats.fetch({
            data:params.query
        }).then(function (response) {
            that.stats.each(function (model, id) {
                that.statView = new StatsView({ model: model });
                that.statView.$el.appendTo(that.view.$('#cmp-stats'));
                that.statView.render();
            });
        });
    };

    //
    // Render chart
    //
    that.renderChart = function(response) {
        let chartWidget = new ChartWidget({
            type : 'line',
            header : {
                title  : "<span>Total revenue </span>",
                label  : "<h2>£150,000 </h2>"
            },
            showLabels : true,
            label: {
                position: "header",
            },
            data:response
        });
        chartWidget.render();
        this.view.$('#chart-total-revenue').html(chartWidget.$el);
    };
    
    that.initChart = function() {
        //
        //
        that.revenueCollection = new RevenueCollection();
        // Get Campaigns
        that.revenueCollection.fetch({
            data:params.query
        }).then(function (response) {
            that.renderChart(response);
        });
    };
    
    //
    //
    // Render campaigns stats
    //
    that.renderAvailableCampaignsList = function (response) {
        
        let dataSet = [];

        that.availabileCampaigns.each(function (model, id) {
            let _cmp = [
                Helpers.campaignsName(model),
                Helpers.dateFormat(model.get('date')),
                model.get('emails_sent'),
                Helpers.calcPercentage(model.get('impressions'),model.get('emails_sent')),
                Helpers.calcPercentage(model.get('engagements'),model.get('emails_sent')),
                Helpers.calcPercentage(model.get('unsubscribed'),model.get('emails_sent')),
            ];
            dataSet.push(_cmp);
        });
        
        let columns =  [
            {
                title: 'Campaign Name',
            },
            {
                title: 'Created',
            },
            {
                title: 'Sent',
            },
            {
                title: 'Open',
            },
            {
                title: 'Clicked',
            },
            {
                title: 'Unsubscribed',
            },
        ];
        
        that.cmpPerformance = new TableWidget({
            header : {
            title       : "<h3>Campaigns performance</h3>",
                label       : "<span>Label description goes here </span>",
                actionTitle : "Sent test email"
            },
            dataSet : dataSet,
            columns : columns
        });
        
        that.cmpPerformance.render();
        that.view.$('#cmp-performance').html(that.cmpPerformance.$el);
        
    };

    this.initCampaigns = function () {
        //
        //
        that.availabileCampaigns = new CampaignsCollection();

        // Get Campaigns
        that.availabileCampaigns.fetch({
            data:params.query
        }).then(function (response) {
            that.renderAvailableCampaignsList(response);
        });
    };


    // Render campaigns stats
    that.renderTopSellingProducts = function () {
        
        let dataSet = [];

        that.products.each(function (model, id) {
            let temp = [
                Helpers.productsName(model),
                model.get('qty'),
                '£' + model.get('price'),
                '£' + model.get('qty') * model.get('price'),
            ];
            dataSet.push(temp);
        });
        
        let columns =  [
            {
                title: 'Item',
            },
            {
                title: 'QTY',
            },
            {
                title: 'Price',
            },
            {
                title: 'Total Price',
            },
        ];
        
        that.cmpTopSellers = new TableWidget({
            header : {
            title       : "<h3>Top sellers</h3>",
                label       : "<span>Latest activity </span>",
            },
            dataSet : dataSet,
            columns : columns
        });
        
        that.cmpTopSellers.render();
        that.view.$('#cmp-topsellers').html(that.cmpTopSellers.$el);
       
        /* 
        that.view.$('#cmp-topsellers').DataTable({
            scrollY: '288px',
            scrollCollapse: true,
            paging: false,
            searching: false,
            info: false,
            order: [],
            data: dataSet,
            columnDefs: [
                {
                    width: '40%',
                    targets: 0,
                },
                {
                    width: '20%',
                    targets: 0,
                },
            ],
            columns: [
                {
                    title: 'Item',
                },
                {
                    title: 'QTY',
                },
                {
                    title: 'Price',
                },
                {
                    title: 'Total Price',
                },
            ],
        });
        */
        
    };

    //
    //
    this.initTopSellers = function () {
        //
        //
        that.products = new TopSellingCollection();
        // Get Campaigns
        that.products.fetch({
            data:params.query
        }).then(function (response) {
            that.renderTopSellingProducts(response);
        });
    };


    //
    that.renderLogs = function () {


        const logs = that.logs.map((item) => {
            return {
                id: item.cid,
                time: item.get("time"),
                color: item.get("color"),
                message: item.get("message"),
            };
        });
        
        console.log(logs);
        
        let widget = new TimelineWidget({
            header : {
                title  : "Timeline",
                label  : "Latest activity"
            },
            logs,
        }).render();
        
        console.log(widget);
        
        that.view.$('#activitytimeline').html(widget.$el);
        
    };

    //
    //
    this.initActivity = function () {
        //
        //
        that.logs = new LogsCollection();
        
        // Get Campaigns
        that.logs.fetch({
            data:params.query
        }).then(function (response) {
            that.renderLogs();
        });
        
    };


    //
    // Init controller and all the dependecies
    //
    
    that.initController = function() {
        this.initView();
        this.initChart();
        this.initStats();
        this.initCampaigns();
        this.initTopSellers();
        this.initActivity();
    };

    that.initController();

    // Listen to events for this specific controller
    // 
    
    window.$app.signals.controller.on(
        'update-daterange',
        function (data) {
            let dateStart = data.start.unix();
            let dateEnd   = data.end.unix();
            // Navigate to order details
            window.$app.helpers.navigate("home/filter?from="+dateStart+"&to="+dateEnd, true);
        },
        this
    );
    
    window.$app.signals.controller.on(
        'refresh-data',
        function (data) {
            that.requireData();
        },
        this
    );

    return this;
    
};
