// Dependecies
const Backbone = require('backbone');
const Model = require('@/models/campaigns');

module.exports = Backbone.Collection.extend({
    initialize: function () {},
    comparator: 'order',
    url: window.$app.apiURL_V1 + 'campaigns',
    model: Model,
});
