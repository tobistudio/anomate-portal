// Dependecies
const Backbone = require('backbone');
const Model = require('@/models/stats');

module.exports = Backbone.Collection.extend({
    url: '/api/stats',
    model: Model,
});