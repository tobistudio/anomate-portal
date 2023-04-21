/*
 *
 *
 */
const Backbone = require('backbone');
const _ = require('underscore');

let schema = {
    company_details: {
        title: 'Company details',
        help: 'Ac praesent eget in commodo. Pellentesque imperdiet sed sed faucibus pellentesque ipsum morbi. Pretium semper commodo tortor cursus ultricies at nibh. Vulputate ornare posuere lobortis turpis.',
        type: 'Object',
        subSchema: {
            business_name: {
                title: 'Business name',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
            industry: {
                title: 'Industry',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
            website: {
                title: 'Website',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
            email: {
                title: 'Email',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
            phone: {
                title: 'Phone',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
        },
    },
    payments_methods: {
        title: 'Billing information',
        help: 'Ac praesent eget in commodo. Pellentesque imperdiet sed sed faucibus pellentesque ipsum morbi. Pretium semper commodo tortor cursus ultricies at nibh. Vulputate ornare posuere lobortis turpis.',
        type: 'Object',
        subSchema: {
            address: {
                title: 'Company address',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
            city: {
                title: 'City',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
            zip: {
                title: 'Postal /ZIP Code',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
            state: {
                title: 'State/Province',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
            country: {
                title: 'Country',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
            vat: {
                title: 'VAT number',
                type: 'Text',
                validators: ['required'],
                fieldClass: 'column-md-6',
            },
        },
    },
};

module.exports = Backbone.Model.extend({
    url: '/api/billing/companydetails',
    initialize: function () {
    },
});
