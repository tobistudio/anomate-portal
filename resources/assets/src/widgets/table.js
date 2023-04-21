const Backbone  = require('backbone');
const _         = require('underscore');
const Template  = require('@/templates/widgets/table.html');

const Widget = 


module.exports = Backbone.View.extend({
    tagName: 'div',
    // Define template data
    data : {
        header:{
            title  : "<h3>Chart Widget </h3>",
            label  : "<span>Label </span>"
        }
    },
    initialize: function(config) {
        // Define config
        this.config  = config;
        // Check if header exist
        if (this.config.header) {
            this.data.header = this.config.header;
        }
    },
    events: {
        'click a': function (e) {
            
            e.preventDefault();
            e.stopPropagation();
        },
    },
    initTable: function() {
        
        let dataSet = [
            ['a','b','c','d'],
            ['a','b','c','d'],
            ['a','b','c','d'],
            ['a','b','c','d'],
            ['a','b','c','d'],
            ['a','b','c','d']
        ];
        
        this.$('.data-table').DataTable({
            scrollY: '278px',
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
                    title: 'Total orders',
                },
                {
                    title: 'Revenue',
                },
            ],
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
