/*
 *
 *
 */
const _ = require('underscore');
const Layout = require('@/views/customers/layout');

module.exports = function (params) {
    let that = this;

    //
    // Define base view
    //
    that.view = new Layout();
    that.view.render();

    that.view.$('.data-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/api/customers',
    });

    return this;
};
