const Backbone  = require('backbone');
const _         = require('underscore');
const Template  = require('./chart.html');
const Style     = require('./chart.scss');
const Chart     = require("chart.js/auto");

const ChartConfigsGlobals = {
    responsive : true,
    maintainAspectRatio : false,
    devicePixelRatio : 1,
    padding: {
        top : 0,
        left : 0,
        bottom : 0,
        right : 0
    },
    legend: {
        display : false
    }
};

// Define chart configs
const ChartConfigs  = {
    line: {
        type : "line",
        options : {
            responsive : ChartConfigsGlobals.responsive,
            maintainAspectRatio : ChartConfigsGlobals.maintainAspectRatio,
            devicePixelRatio : ChartConfigsGlobals.devicePixelRatio,
            layout : {
                padding : ChartConfigsGlobals.padding
            },
            elements : {
                point: {
                    pointStyle: false,
                },
                line : {
                    tension : 0.5,
                }
            },
            scales : {
                x : {
                    display : true,
                    grid : {
                      color : "#FFF"
                    },
                    ticks : {
                      color : "#BFBFBF"
                    }
                },
                y : {
                    lineWidth : 5,
                    grid : {
                      color: "#D9D9D9"
                    },
                    ticks : {
                      color : "#BFBFBF",
                      stepSize : 3
                    }
                }
            },
            animation : true,
            plugins : {
                legend : ChartConfigsGlobals.legend
            }
        }
    },
    scatter: {
        type : "scatter",
        options : {
            responsive : ChartConfigsGlobals.responsive,
            maintainAspectRatio : ChartConfigsGlobals.maintainAspectRatio,
            devicePixelRatio : ChartConfigsGlobals.devicePixelRatio,
            layout : {
                padding : ChartConfigsGlobals.padding
            },
            elements : {
              bar : {
                borderRadius : 5,
              },
              line: {
                tension : 0.5,
                borderJoinStyle : "round"
              }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks : {
                        color: "#BFBFBF"
                    }
                }
            },
            animation : true,
            plugins : {
                legend : ChartConfigsGlobals.legend
            }
        }
    },
    doughnut: {
        type: "doughnut",
        options: {
            responsive : ChartConfigsGlobals.responsive,
            maintainAspectRatio : ChartConfigsGlobals.maintainAspectRatio,
            devicePixelRatio : 1,
            layout : {
                padding : ChartConfigsGlobals.padding
            },
            elements: {
                arc: {
                  borderWidth: 5,
                  hoverBorderColor: "#FFF",
                  borderRadius: 50,
                  borderColor: "#FFF",
                  background: "#0000",
                },
            },
            animation: true,
            plugins : {
                legend : ChartConfigsGlobals.legend
            }
        }
    }
};

Chart.controllers.DoughnutController.prototype.calculateTotal = function () {
    return 100; // all data now has to be in the range [0, 100]
};

module.exports = Backbone.View.extend({
    tagName: 'div',
    // Define template data
    data : {
        header:{
            title  : "<h3>Chart Widget </h3>",
            label  : "<span>Label </span>"
        },
        label: {
            position: "top", 
            direction: "center",
            disable: false,
        },   
        chartTitle: null,
        dateFilter: false,
        dateRange: [
            {
                label: "Last 7 days",
                value: ""
            },
            {
                label: "Last month",
                value: ""
            },
            {
                label: "Last year",
                value: ""
            },
        ]
    },
    initialize: function(config) {
        
        // Define config
        this.config  = config;

        // Check if header exist
        if (this.config.header) {
            this.data.header = this.config.header;
        }
        
        // Check if labels are allowed
        this.config.showLabels ? this.navigation() : this.data.labels = false

        this.data.label.position = this.config.label?.position || "top";

        this.data.label.direction = this.config.label?.direction || "center";

        this.data.label.disable = this.config.label?.disable;

        if(this.config.type === "doughnut") {
            this.data.label.disable = true;
        }

        if(this.config.chartTitle && this.config.type === "doughnut") {
            this.data.chartTitle = this.config.chartTitle
        } else {
            this.data.chartTitle = null;
        }

        this.data.dateFilter = this.config.dateFilter

        this._chart = ChartConfigs[this.config.type];
        this._chart.data = this.config.data;

    },
    navigation:function() {
        
        this.data.labels = {};

        if (this.config.data.datasets) {
            _.each(
                this.config.data.datasets,
                function (value, key) {
                    this.data.labels[key] = {
                        title: value.label,
                        value: this.calcNavigationValue(value),
                        style: value?.backgroundColor || value?.borderColor,
                        id: key,
                    };
                },
                this
            );
        }
        
    },
    calcNavigationValue: function(value) {
        const chartType = this.config.type;
        if(chartType === 'doughnut') {
            return `${value.data[0]}%`
        }
        return null;
    },
    events: {
        'click .widget-nav a': function (e) {
            if (
                (this.config.label && this.config.label.disable) ||
                (this.config.type === 'doughnut')
            ) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            this.labelEl = this.$(e.currentTarget);
            if (this.labelEl.data('status')) {
                this.chart.hide(this.labelEl.data('index'));
                this.labelEl.data('status',false);
            } else {
                this.chart.show(this.labelEl.data('index'));
                this.labelEl.data('status',true);
            }
            e.preventDefault();
            e.stopPropagation();
        },
        'click .date-range-drop-item': function (e) {
            const el = this.$(e.currentTarget);
            const groupEl = el.parents(".date-range-group");
            const index = el.data("index");

            groupEl.removeClass("open");
            groupEl.children("button:eq(0)").html(this.data.dateRange[index].label);
            e.preventDefault();
            e.stopPropagation();
        },
    },
    // Render widget
    render: function () {

        // Widget Template
        this.template = _.template(Template);

        this.$el.html(this.template(this.data));
        
        if (typeof Chart == 'function') {
            // Init chart.
            this.chart = new Chart(this.$('canvas'),this._chart);
        }
        
        return this;
    },
});
