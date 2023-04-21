/*
 *
 *
 */
const Backbone  = require('backbone');
const _         = require('underscore');
const moment    = require('moment');
const Layout    = require('@/views/user/layout');
const Store     = require('@/models/store');
const Forms     = require('@/system/forms/init');

// Data
const Cities    = require('@/configs/data/cities');
const Indutries = require('@/configs/data/industries');

const Templates = {
    company_details                 : require('@/templates/users/billing/company-details.html'),
    billing_info                    : require('@/templates/users/billing/billing-info.html'),
    payment_methods                 : require('@/templates/users/billing/payment-methods.html'),
    payment_methods_single          : require('@/templates/users/billing/payment-methods-single.html'),
};

module.exports = function (params) {
    
    let that = this;

    // Define user model
    this.store = new Store();

    //
    // Define base view
    //
    this.view = new Layout();
    this.view.render();
    
    // Init form
    this.companyDetails = new Forms({
        schema: {
            business_name: {
                title: 'Business Name',
                type: 'Text',
                editorAttrs: {
                    placeholder: 'Your business name*',
                },
            },
            industry: {
                title: 'Industry',
                type: 'Dropdown',
                editorAttrs: {
                    multiple :true,
                },
                options:Indutries
            },
            website_url: {
                title: 'Website URL',
                type: 'Text',
                editorAttrs: {

                },
            },
            email: {
                title: 'Email',
                type: 'Text',
                editorAttrs: {

                },
            },
            phone: {
                title: 'Phone',
                type: 'Text',
                editorAttrs: {

                },
            },
        },
        data: {
            industry:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
        },
        submitButton: 'Save changes',
        cancelButton: 'Cancel',
        templateData: {
            // Add title and description
            title: 'Company details',
            description: 'Please insert your company details information. Business name, industry where your business operatates etc.',
        },
        template: _.template(Templates.company_details),
    }).render();

    // On form submit
    this.companyDetails.on('submit', function (event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
            console.log(that);
        }
    });

    // Append form to view
    // Note the view is below the tab navs.
    // The elements should be defined in the template skeleton.
    this.companyDetails.$el.appendTo(this.view.$el);


      // Init form
    this.billingInfo = new Forms({
        schema: {
            company_address: {
                title: 'Company address',
                type: 'Text',
                editorAttrs: {
                    placeholder: 'Your business name*',
                },
            },
            city: {
                title: 'City',
                type: 'Dropdown',
                options: Cities
            },
            zip: {
                title: 'Postal /ZIP Code',
                type: 'Text',
                editorAttrs: {

                },
            },
            state: {
                title: 'State/Province',
                type: 'Text',
                editorAttrs: {

                },
            },
            country: {
                title: 'Country',
                type: 'Text',
                editorAttrs: {

                },
            },
            vat: {
                title: 'VAT number',
                type: 'Text',
                editorAttrs: {

                },
            },
        },
        data: {},
        submitButton: 'Save changes',
        cancelButton: 'Cancel',
        templateData: {
            // Add title and description
            title: 'Billing information',
            description: 'Please specify the company billing information including VAT number. These data will be included in our invoices.',
        },
        template: _.template(Templates.billing_info),
    }).render();

    // On form submit
    this.billingInfo.on('submit', function (event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
            console.log(that);
        }
    });

    // Append form to view
    // Note the view is below the tab navs.
    // The elements should be defined in the template skeleton.
    this.billingInfo.$el.appendTo(this.view.$el);
    
    // Init form
    this.paymentMethods = new Forms({
        schema: {
            //We use our nested model in List Items here.
            methods: {
                title: false,
                type: 'List',
                itemType: 'Object',
                itemToString: function (value,schema) {
                    
                    value.card_type = window.$app.helpers.checkCardType(value.card_number);
                    
                    this.template = _.template(Templates.payment_methods_single);
                    this.template = this.template({
                        data    : value,
                        schema  : schema.subSchema
                    });
                    
                    return this.template;
                },
                subSchema: {
                    card_name: {
                        fieldClass: 'column-md-12',
                        title: 'Name on card',
                        type: 'Text',
                        validators: ['required'],
                    },
                    card_number: {
                        fieldClass: 'column-md-12',
                        title: 'Card numbers',
                        type: 'Number',
                        validators: [
                            'required',
                            function checkCardType(value, formValues) {
                                if (!window.$app.helpers.checkCardType(value)) {
                                    return {
                                        type    : 'card',
                                        message : "Invalid card"
                                    };
                                }
                            }
                        ],
                    },
                    expiration_month: {
                        fieldClass: 'column-md-4',
                        title: 'Expiration month*',
                        type: 'Number',
                        validators: [
                            'required',
                            {
                              type: 'range',
                              min: 1,
                              max: 12,
                              message: 'Invalid month'
                            }
                        ],
                    },
                    expiration_year: {
                        fieldClass: 'column-md-4',
                        title: 'Expiration year*',
                        type: 'Number',
                        validators: [
                            'required',
                            function (value,formValues) {
                                if (value<2023) {
                                    return {
                                        type    : 'expiration_year',
                                        message : "Invalid year"
                                    };
                                }
                            }
                        ],
                    },
                    cvv: {
                        fieldClass: 'column-md-4',
                        title: 'CVV',
                        type: 'Number',
                        validators: [
                            'required',
                            function checkCVV(value, formValues) {
                                if (value.toString().length!=3) {
                                    return {
                                        type    : 'cvv',
                                        message : "Invalid CVV"
                                    };
                                }
                            }
                        ],
                    }
                },
            },
        },
        data: {
            methods:[
                {
                    "card_name" : "Astrit Lala",
                    "card_number" : "4824740018256518",
                    "expiration_month" : "3",
                    "expiration_year" : "2027",
                    "cvv" : "142"
                },
                {
                    "card_name" : "Astrit Lala",
                    "card_number" : "5437339808067478",
                    "expiration_month" : "3",
                    "expiration_year" : "2027",
                    "cvv" : "142"
                },
                {
                    "card_name" : "Astrit Lala",
                    "card_number" : "370441499949368",
                    "expiration_month" : "3",
                    "expiration_year" : "2027",
                    "cvv" : "142"
                }
            ],
        },
        templateData: {
            // Add title and description
            title: 'Payment information',
            description: 'Please add your payment information.',
        },
        template: _.template(Templates.payment_methods),
    }).render();

    // On form submit
    this.paymentMethods.on('submit', function (event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
            let data = that.getValue();
        }
    });

    // Append form to view
    // Note the view is below the tab navs.
    // The elements should be defined in the template skeleton.
    this.paymentMethods.$el.appendTo(this.view.$el);
    
    return this;
    
};
