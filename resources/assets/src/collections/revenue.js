// Dependecies
const Backbone = require('backbone');
const Model = require('@/models/revenue');

module.exports = Backbone.Collection.extend({
    url: '/api/campaigns/revenue',
    model: Model,
});
