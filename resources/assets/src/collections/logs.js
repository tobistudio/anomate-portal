// Dependecies
const Backbone = require('backbone');
const Model = require('@/models/customer');

module.exports = Backbone.Collection.extend({
    url: '/api/campaigns/logs',
    model: Model,
});
