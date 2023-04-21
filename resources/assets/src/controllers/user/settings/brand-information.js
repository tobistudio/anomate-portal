/*
 *
 *
 */
const Backbone  = require('backbone');
const _         = require('underscore');
const Layout    = require('@/views/user/layout');
const Store     = require('@/models/store');
const Forms     = require('@/system/forms/init');

const Templates = {
    brand_information               : require('@/templates/users/brand-information/brand-information.html'),
    footer_information_address      : require('@/templates/users/brand-information/footer-information-address.html'),
    footer_information_socialmedia  : require('@/templates/users/brand-information/footer-information-socialmedia.html'),
    social_media_links              : require('@/templates/snippets/list-social-links.html'),
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
    this.brandInfo = new Forms({
        schema: {
            brand_name: {
                title: 'Brand Name',
                type: 'Text',
                editorAttrs: {
                    placeholder: 'Add brand name here*',
                },
            },
            default_logo: {
                title: 'Default Logo',
                type: 'FileUploader',
                help: 'Formats HEIC, WEBP, SVG, PNG or JPG. Recommended min width 512px.',
                editorAttrs: {
                    placeholder: 'Add default logo',
                },
                validators: [
                    'required'
                ],
            },
            dark_logo: {
                title: 'Dark Logo',
                type: 'FileUploader',
                help: 'Formats HEIC, WEBP, SVG, PNG or JPG. Recommended min width 512px.',
                editorAttrs: {
                    placeholder: 'Add dark logo',
                },
                validators: [
                    'required'
                ],
            },
        },
        data: {
            default_logo: "https://dev.anomate.co/images/logo.jpg",
        },
        submitButton: 'Update assets',
        cancelButton: 'Cancel',
        templateData: {
            // Add title and description
            title: 'Brand name and logo',
            description:
                'Please specify the name of your store and upload the appropriate logos in the fields below.',
        },
        template: _.template(Templates.brand_information),
    }).render();

    // On form submit
    this.brandInfo.on('submit', function (event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
            console.log(that);
        }
    });

    // Append form to view
    // Note the view is below the tab navs.
    // The elements should be defined in the template skeleton.
    this.brandInfo.$el.appendTo(this.view.$el);

    // Init form
    this.address = new Forms({
        schema: {
            address: {
                title: 'Address',
                type: 'TextArea',
            },
            zip: {
                title: 'Zip Code',
                type: 'Text',
            },
            pobox: {
                title: 'Po box',
                type: 'Text',
            },
            city: {
                title: 'City',
                type: 'Text',
            },
            state: {
                title: 'State',
                type: 'Text',
            },
        },
        data: {
        
        },
        submitButton: 'Update information',
        cancelButton: 'Cancel',
        templateData: {
            // Add title and description
            title: 'Store address',
            description: 'This is the address displayed on the footer of your emails.',
        },
        template: _.template(Templates.footer_information_address),
    }).render();

    // On form submit
    this.address.on('submit', function (event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
            let data = that.getValue();
        }
    });

    // Append form to view
    // Note the view is below the tab navs.
    // The elements should be defined in the template skeleton.
    this.address.$el.appendTo(this.view.$el);
    
    // Init form
    this.socialMedia = new Forms({
        schema: {
            //We use our nested model in List Items here.
            social_media: {
                title: 'Social Media',
                type: 'List',
                itemType: 'Object',
                itemToString: function (value,schema) {
                    this.template = _.template(Templates.social_media_links);
                    this.template = this.template({
                        data: value,
                        schema: schema.subSchema
                    });
                    return this.template;
                },
                subSchema: {
                    channel: {
                        title: 'Social Media',
                        type: 'Select',
                        options: [
                            {
                                label: 'Facebook',
                                icon: 'ai-facebook-fill',
                                val:'facebook'
                            },
                            {
                                label: 'Linkedin',
                                icon: 'ai-linkedin-fill',
                                val:'linkedin'
                            },
                            {
                                label: 'Twitter',
                                icon: 'ai-twitter-fill',
                                val:'twitter'
                            },
                            {
                                label: 'Instagram',
                                icon: 'ai-instagram-fill',
                                val:'instagram'
                            },
                            {
                                label: 'Pinterest',
                                icon: 'ai-pinterest-fill',
                                val:'pinterest'
                            },
                            {
                                label: 'Website',
                                icon: 'ai-pinterest-fill',
                                val : 'website'
                            },
                            {
                                label : 'Website',
                                icon : 'ai-pinterest-fill',
                                val : 'other'
                            },
                        ],
                        validators: [
                            'required',
                            function(value,form) {
  
                            }
                        ],
                    },
                    url: {
                        title: 'URL',
                        type: 'Text',
                        validators: ['required', 'url'],
                    }
                },
            },
        },
        data: {
            social_media:[
                {
                    "channel": "facebook",
                    "url": "https://www.facebook.com/"
                },
                {
                    "channel": "linkedin",
                    "url": "https://www.linkedin.com/feed/"
                },
                {
                    "channel": "pinterest",
                    "url": "https://www.pinterest.com/"
                },
                {
                    "channel": "twitter",
                    "url": "https://twitter.com/"
                }
            ],
        },
        templateData: {
            // Add title and description
            title: 'Social Media',
            description: 'This is the address displayed on the footer of your emails.',
        },
        template: _.template(Templates.footer_information_socialmedia),
    }).render();

    // On form submit
    this.socialMedia.on('submit', function (event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
            let data = that.getValue();
        }
    });

    // Append form to view
    // Note the view is below the tab navs.
    // The elements should be defined in the template skeleton.
    this.socialMedia.$el.appendTo(this.view.$el);
    
    return this;
    
};
