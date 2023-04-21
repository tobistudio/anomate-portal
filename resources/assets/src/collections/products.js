// Dependecies
const Backbone = require('backbone');
const Model = require('@/models/customer');

module.exports = Backbone.Collection.extend({
    url: window.$app.apiURL_V1 + 'campaigns/products',
    model: Model,
});
