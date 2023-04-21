/*
 *
 *
 */
const _                     = require('underscore');
const CampaignsCollection   = require('@/collections/campaigns');
const StatsCollection       = require('@/collections/stats');
const Layout                = require('@/views/campaigns/single');
const htmlWidget            = require('@/widgets/html');
const ChartWidget            = require('@/widgets/charts/chart');

module.exports = function (context) {
    
    let that = this;
    
    //
    // Define base view
    //
    this.view = new Layout({model:context.campaign});
    this.view.render();
    
    //render campaign performance chart
    that.campaignPerformanceRender = function() {

        let widget = new ChartWidget({
                type : 'doughnut',
                header : {
                    title  : "<h3>Campaign performance</h3>",
                    label  : "<span>Label</span>"
                },
                chartTitle: {
                    title: 625,
                    label: "Received",
                },
                showLabels: true,
                label: {
                    position: "left",
                },
                dateFilter: true,
                data: {
                    datasets: [
                        {
                            label: "Opened",
                            backgroundColor: ["rgba(125, 226, 255, 1)"],
                            data: [80],
                        },
                        {
                            label: "Clicked",
                            backgroundColor: ["rgba(179, 127, 235, 1)"],
                            data: [60],
                        },
                        {
                            label: "Purchased",
                            backgroundColor: ["rgba(255, 133, 192, 1)"],
                            data: [50],
                        },
                        {
                            label: "Unsubscribed",
                            backgroundColor: ["rgba(255, 229, 143, 1)"],
                            data: [20],
                        },
                    ],
                }
        }).render();

        this.view.$('#campaign-performance').html(widget.$el);
        
    };

    that.totalImpressionRender = function() {

        let widget = new ChartWidget({
            type : 'line',
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
            data: {
                labels: ["15 Jan", "16 Jan", "17 Jan", "18 Jan", "19 Jan", "20 Jan", "21 Jan"],
                datasets: [
                    {
                        label: "Line Dataset",
                        borderColor: "rgba(125, 226, 255, 1)",
                        data: [10, 20, 30, 40, 50, 40, 30, 20],
                        fill: false,
                    },
                    {
                        label: "Bar Dataset",
                        borderColor: "rgba(179, 127, 235, 1)",
                        data: [10, 20, 25, 20, 30, 40, 35, 10],
                    },
                ],
            }
        }).render();

        this.view.$('#total-impressions').html(widget.$el);
    };

    setTimeout(() => {
        that.campaignPerformanceRender();
        that.totalImpressionRender();
    }, 1000);

    return this;
    
};
