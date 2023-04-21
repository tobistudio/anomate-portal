/*
 *
 *
 */

const _ = require('underscore');
const Layout = require('@/views/user/layout');

module.exports = function (parent) {
    let that = this;

    //
    // Define base view
    //
    that.view = new Layout();
    that.view.render();
    this.view.$el.html('test');

    return this;
};
