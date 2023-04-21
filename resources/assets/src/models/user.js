/*
 *
 *
 */
const Backbone = require('backbone');
const _ = require('underscore');

module.exports = Backbone.Model.extend({
    url: window.$app.apiURL_V1 + 'user',
    initialize: function () {},
});
