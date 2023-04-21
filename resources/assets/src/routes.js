const Backbone = require('backbone');
// Router defination
// :componnent
// :action can be the user id , client id, student id. It refer the model
// :method can be edit,delete

module.exports = Backbone.Router.extend({
    routes: {
        '': 'componnent',
        ':componnent': 'componnent',
        ':componnent/:child': 'componnent',
        ':componnent/:child(?:params)': 'componnent',
    },
});
