/*
 *
 *
 */

const _ = require('underscore');
const Layout = require('@/views/pages/layout');

module.exports = function (params) {
    let that = this;

    //
    // Define base view
    //
    that.view = new Layout();
    that.view.render();

    return this;
};
