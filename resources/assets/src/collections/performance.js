// Dependecies
const Backbone = require('backbone');
const Model = require('@/models/campaigns');

module.exports = Backbone.Collection.extend({
    url: '/api/campaigns/performance',
    model: Model,
});
