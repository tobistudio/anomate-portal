/*
 *
 *
 */

const _ = require('underscore');

const DomainsVerificationCollection = require('@/collections/domains');
const DomainsVerificationModel      = require('@/models/domains');
const DomainVerificationView        = require('@/views/user/domain-verification');
const Forms                         = require('@/system/forms/init');
const Helpers                       = require('@/system/helpers');

const Templates = {
    linkDomain          : require('@/templates/users/domain-verification/link-domain.html'),
    senderInformation   : require('@/templates/users/domain-verification/sender-information.html'),
    dnsVerification     : require('@/templates/users/domain-verification/dns-verification.html'),
    verificationStatus  : require('@/templates/users/domain-verification/verification-status.html'),
};

module.exports = function (params) {
    
    let that = this;
    
    // Deifne Domain collections
    that.collection = new DomainsVerificationCollection();

    //
    // Define base view
    //
    that.view  = new DomainVerificationView();
    that.view.collection = that.collection;
    
    that.modal  = window.$app.baseView.modals;

    // On collection sync reinit form
    that.sync = function() {
        that.collection.fetch().then(function(response){
            that.init();
        });
    };
    
    // Sync collection
    that.sync();

    // Init 
    that.init = function() {
        that.view.render();
        that.initForms();
    };

    // Init domain tables...
    this.initTable = function() {
        console.log(that.collection);
    };
    
    // Init Forms
    that.initForms = function() {
    
        // Init an empty model
        that.model  = new DomainsVerificationModel();
        
        // Init form
        let Form = new Forms({
            schema : {
                domain: {
                    type: "Text",
                    title: 'What is your domain?',
                    editorAttrs:{
                        placeholder:'your-domain.com'
                    },
                    validators: [
                        'required',
                        function checkDomain(domain, formValues) {
                            domain = Helpers.extractDomain(domain);
                            let match = that.collection.where({domain:domain});
                            if (match.length>=1) {
                                return  {
                                    type: 'domain',
                                    message: 'Domein '+domain+' is already added!'
                                };
                            }
                        }]
                }
            },
            model : that.model,
            templateData: {
                // Add title and description
                title: 'Link existing domain',
                description: 'In order to use our service you should verify that your are the owner of the domain that you are going to use. <br> Please enter your domain name and follow the instructions.',
            },
            submitButton: 'Check domain',
            cancelButton: 'Back',
            template: _.template(Templates.linkDomain)
        }).render();
        
        // On form submit
        Form.on('reset',function(event) {
            that.modal.$('.modal').modal('hide');
            that.initForms();
        });
        
        // On form submit
        Form.on('submit',function(event) {
            // If the form commit suceed
            if (!this.commit()) {
                that.model.save().then(function(response){
                    if (response.domain=='') {
                        Form.fields.domain.setError("We can't reach this domain");
                    } else {
                        that.senderInformation();
                    }
                });
            }
        });
        
        that.modal.body.html(Form.$el);
        
    };
    
    that.senderInformation = function() {
        
        let domain = Helpers.extractDomain(that.model.get('domain'));

        // Init form
        let Form = new Forms({
            schema : {
                name: {
                    type: "Text",
                    title: "Sender name",
                    validators: ['required']
                },
                sender: {
                    type: "Text",
                    title: "Send from",
                    validators: ['required'],
                    editorAttrs : {
                        addon:'@'+domain
                    }
                },
            },
            model : that.model,
            templateData: {
                // Add title and description
                title: 'Define sender information!',
                description: 'Please include the name that will appear in the e-mail sent to your customers! <br> If you need help please check our <a href="#"> documentation </a>  ',
            },
            submitButton: 'Next',
            cancelButton: 'Back',
            template: _.template(Templates.senderInformation)
        }).render();

        // On form submit
        Form.on('reset',function(event) {
            that.initForms();
        });
        
        // On form submit
        Form.on('submit',function(event) {
            // If the form commit suceed
            if (!this.commit()) {
                that.dnsVerification();
            }
        });
        
        that.modal.body.html(Form.$el);
        
    };
    
    that.dnsVerification = function() {
        
        // Init form
        let Form = new Forms({
            schema : {
                type: {
                    type: "Text",
                    title: "DNS record type",
                    editorAttrs: {
                        'readonly':true,
                    }
                },
                host: {
                    type: "Text",
                    title: "DNS record Host",
                    editorAttrs: {
                        'readonly':true,
                    }
                },
                value: {
                    type: "Text",
                    title: "DNS record value",
                    editorAttrs: {
                        'readonly':true,
                    }
                },
            },
            model : that.model,
            templateData: {
                // Add title and description
                title: 'Update your DNS zone!',
                description: 'Please include the TXT records below, in your DNS zone. We will check, if you are the domain owner! <br> If you need help please check our <a href="#"> documentation </a>  ',
            },
            submitButton: "I'm done",
            cancelButton: 'Back',
            template: _.template(Templates.dnsVerification)
        }).render();

        // On form submit
        Form.on('reset',function(event) {
            that.senderInformation();
        });
        
        // On form submit
        Form.on('submit',function(event) {
            that.verificationComplete();
        });
        
        that.modal.body.html(Form.$el);
        
    };
    
    that.verificationComplete = function() {
        
        // Init form
        let Form = new Forms({
            events: {
                'click .submit': function (e) {
                    that.collection.add(that.model);
                    that.init();
                    that.modal.$('.modal').modal('hide');
                    that.initForms();
                    e.stopPropagation();
                    e.preventDefault();
                },
                'click .reset': function (e) {
                    that.initForms();
                    e.stopPropagation();
                    e.preventDefault();
                },
            },
            templateData: {
                // Add title and description
                title: 'Verification in progress!',
            },
            cancelButton: 'Start over',
            submitButton: "Status page",
            template: _.template(Templates.verificationStatus)
        }).render();

        that.modal.body.html(Form.$el);
        
    };
    
    return this;
};
