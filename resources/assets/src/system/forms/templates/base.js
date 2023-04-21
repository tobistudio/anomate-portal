const _ = require('underscore');

module.exports = _.template(
    '<form class="" role="form">' +
        '<div data-fieldsets></div>' +
        '<% if (submitButton) { %>' +
            '<button type="submit" class="action-link submit action-link-primary pull-right"><%= submitButton %></button>' +
        '<% } %>' +
        '<% if (cancelButton) { %>' +
            '<button type="reset" class="action-link submit action-link-default pull-right"><%= cancelButton %></button>' +
        '<% } %>' +
    '</form>'
);