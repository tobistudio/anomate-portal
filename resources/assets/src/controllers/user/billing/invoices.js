/*
 *
 *
 */

const _      = require('underscore');
const Layout = require('@/views/user/invoices');

module.exports = function (parent) {
    
    let that = this;

    //
    // Define base view
    //
    that.view = new Layout();
    that.view.render();

    that.view.$('.data-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/api/user/billing/invoices',
    });
    
    return this;
};
