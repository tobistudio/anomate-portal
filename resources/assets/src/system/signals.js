const Backbone = require('backbone');
const _ = require('underscore');

// Event defination
//
module.exports = function () {
    // Define application signals or events/
    // but I decided to name it signals because the events have another meaning in this application
    this.signals = {
        system: {},
        controller: {},
    };
    this.signals.system = _.extend(this.signals.system, Backbone.Events);
    this.signals.controller = _.extend(this.signals.controller, Backbone.Events);
    return this.signals;
};
