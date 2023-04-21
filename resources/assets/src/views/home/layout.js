const Backbone  = require('backbone');
const _         = require('underscore');
const Template  = require('@/templates/dashboard.html');
const moment    = require('moment');

module.exports = Backbone.View.extend({
    className: 'row',
    tagName: 'div',
    initialize: function (params) {
        this.range = 'All time';
        if (params.query) {
            if (params.query.from&&params.query.to) {
                let startDate   = moment.unix(params.query.from).format("MM dd YY");
                let endDate     = moment.unix(params.query.to).format("MM dd YY");
                this.range = startDate+' - '+endDate;
            }
        }
    },
    events: {
        'click a': function (e) {
            // Get the href attribute
            let element = this.$(e.currentTarget);
            // Navigate to order details
            window.$app.helpers.navigate(element.attr('href'), true);
            e.stopPropagation();
            e.preventDefault();
        },
    },
    dateRangesConfig: {
        alwaysShowCalendars: true,
        opens: "left",
        buttonClasses: "action-link action-link-sm",
        applyButtonClasses: "action-link-primary",
        cancelClass: "action-link-default",
        ranges:{
            "All time": [
                moment(), 
                moment()
            ],
            "Last 7 Days": [
                moment().subtract(6,"days"), 
                moment()
            ],
            "Last 30 Days": [
                moment().subtract(29,"days"),
                moment()
            ],
            "This Month": [
                moment().startOf("month"), 
                moment().endOf("month")
            ],
            "Last Month": [
                moment().subtract(1,"month").startOf("month"),
                moment().subtract(1,"month").endOf("month"),
            ]
        }
    },
    initDateRanges: function() {
        
        let that = this;
        
        this.$('.date-range').daterangepicker(this.dateRangesConfig,function (start,end,label) {
            // Update the label
            that.$(this.element).html(label+' <i class="user-notifications ai-calendar"></i>');
            // Triggera a signal to update the selected sidebar
            window.$app.signals.controller.trigger('update-daterange',{start,end,label});
        });
        
    },
    // Render widget
    render: function () {
        
        this.template = _.template(Template);
        
        this.$el.html(this.template({
            helpers:window.$app.helpers,
            range:this.range
        }));
        
        this.initDateRanges();
        
        return this;
    },
});
