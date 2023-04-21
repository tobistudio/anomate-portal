/*
 *
 *
 */

const _ = require('underscore');

const WidgetsCollection     = require('@/collections/widgets');
const Layout                = require('@/views/widgets/layout');

module.exports = function (params) {

    let that = this;
    
    //
    // Define base view
    //
    this.initView = function () {
        that.view = new Layout(params);
        that.view.render();
    };
    
    this.initView();
    
    return this;
    
};
