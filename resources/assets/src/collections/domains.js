// Dependecies
const Backbone = require('backbone');
const Model = require('@/models/domains');

module.exports = Backbone.Collection.extend({
    url: '/api/settings/domains',
    model: Model,
});
