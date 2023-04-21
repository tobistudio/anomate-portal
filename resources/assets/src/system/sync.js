/*
 *
 *   Backbone Sync override
 *
 *
 */

const _ = require('underscore');
const Backbone = require('backbone');

let countRequests = 0;
let countResponse = 0;

// Map from CRUD to HTTP for our default `Backbone.sync` implementation.
let methodMap = {
    create  : 'POST',
    update  : 'PUT',
    patch   : 'PATCH',
    delete  : 'DELETE',
    read    : 'GET',
};

// Throw an error when a URL is needed, and none is supplied.
let urlError = function () {
    throw new Error('A "url" property or function must be specified');
};

module.exports = function (method, model, options) {
    
    let type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
        emulateHTTP: Backbone.emulateHTTP,
        emulateJSON: Backbone.emulateJSON,
        cache: true,
        xhrFields: {
            // withCredentials: true
        },
    });

    // Default JSON-request options.
    let params = {
        type: type,
        dataType: 'json',
    };

    // Ensure that we have a URL.
    if (!options.url) {
        params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (
        options.data == null &&
        model &&
        (method === 'create' || method === 'update' || method === 'patch')
    ) {
        params.contentType = 'application/json';
        params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
        params.processData = false;
    }

    // Pass along `textStatus` and `errorThrown` from jQuery.
    let error = options.error;

    options.beforeSend = function (xhr) {
        // Pass the CSRF token in the header.
        if (window.$app.token) {
            xhr.setRequestHeader('X-CSRF-TOKEN', window.$app.token);
        }
        if (window.$app.api_token) {
            xhr.setRequestHeader('api-token', window.$app.api_token);
        }
        countRequests += 1;
        if (countRequests == 1) {
            window.$app.helpers.progressLoader('start');
        }
    };

    options.complete = function (xhr, response) {
        countResponse += 1;
        if (countRequests == countResponse) {
            countRequests = 0;
            countResponse = 0;
            window.$app.helpers.progressLoader('end');
        }
    };

    options.error = function (xhr, textStatus, errorThrown) {
        options.textStatus = textStatus;
        options.errorThrown = errorThrown;
        if (error) {
            error.call(options.context, xhr, textStatus, errorThrown);
        }
        window.$app.helpers.progressLoader('end');
    };

    // Make the request, allowing the user to override any Ajax options.
    let xhr = (options.xhr = Backbone.ajax(_.extend(params, options)));

    model.trigger('request', model, xhr, options);

    return xhr;
    
};
