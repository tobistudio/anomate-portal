const Backbone  = require('backbone');
const _         = require('underscore');
const Template  = require('./table.html');
const Style     = require('./table.scss');

const TableConfigsGlobals = {
    scrollY: '280px',
    scrollCollapse: true,
    paging: false,
    searching: false,
    info: false,
    order: [],
};

module.exports = Backbone.View.extend({
    tagName: 'div',
    // Define template data
    data : {
        header:{
            title       : "<h3>Table Widget </h3>",
            label       : "<span>Label </span>",
            actionTitle : null
        },
        actionGroup: null
    },
    initialize: function(config) {
        // Define config
        this.config  = config;
        // Check if header exist
        if (this.config.header) {
            this.data.header = this.config.header;
        }
        this.data.actionGroup = this.config.actionGroup;
    },
    events: {
        'click .header-action-item': function (e) {
            console.log('clicking header-action-item', e)
            e.preventDefault();
            e.stopPropagation();
        },
        'click .action-group-item': function (e) {
            const el = this.$(e.currentTarget);
            this.$(".action-group-item").addClass("action-link-default");
            this.$(".action-group-item").removeClass("action-link-primary");
            el.removeClass("action-link-default")
            el.addClass("action-link-primary")
            const key = el.data("key")
            console.log('clicking action-group-item', key)
        },
    },
    initTable: function() {
        this.$('.data-table').DataTable({
            ...TableConfigsGlobals,
            data: this.config.dataSet || [],
            columns: this.config.columns || [],
        });
        
    },
    // Render widget
    render: function () {
        
        // Widget Template
        this.template = _.template(Template);
        this.template = this.template(this.data);
        
        let that = this;
        
        this.$el.html(this.template).ready(function(e){
            that.initTable();
        });
        
        return this;
    },
});
