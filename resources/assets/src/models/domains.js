/*
 *
 *
 */
const Backbone = require('backbone');
const _ = require('underscore');

module.exports = Backbone.Model.extend({
    url: '/api/settings/domains/verify',
});