/*
 *
 *
 */
const Backbone = require('backbone');
const _ = require('underscore');
const Layout = require('@/views/user/layout');
const user = require('@/models/user');
const Forms     = require('@/system/forms/init');

const Templates = {
    user_details    : require('@/templates/users/details/details.html'),
    user_settings   : require('@/templates/users/details/settings.html'),
};

module.exports = function (params) {
    
    let that = this;

    // Define user model
    this.user = window.$app.session.user;

    //
    // Define base view
    //
    this.view = new Layout();
    this.view.render();

    // Init form
    this.userDetails = new Forms({
        schema: {
            avatar: {
                title: 'Profile Picture',
                type: 'FileUploader',
            },
            firstname: {
                title: 'First name',
                type: 'Text'
            },
            lastname: {
                title: 'Last name',
                type: 'Text',
            },
            email: {
                title: 'Email',
                type: 'Text',
            },
            newsletter: {
                title: 'How often would you like to receive our marketing emails?',
                type: 'Radio',
                options: {
                    off: 'Disable',
                    daily: 'Daily',
                    weekly: 'Weekly',
                    monthly: 'Monthly',
                },
            },
        },
        model: that.user,
        submitButton: 'Save changes',
        cancelButton: 'Cancel',
        template: _.template(Templates.user_details),
        templateData: {
            // Add title and description
            title: 'User details and preferences',
            description:
                'Ac praesent eget in commodo. Pellentesque imperdiet sed sed faucibus pellentesque ipsum morbi. <br> Pretium semper commodo tortor cursus ultricies at nibh. Vulputate ornare posuere lobortis turpis.',
        },
    }).render();

    // On form submit
    this.userDetails.on('submit', function (event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
            this.model
                .save(this.getValue(), {
                    wait: true,
                })
                .then(
                    function () {
                        that.commit();
                    },
                    function (error) {
                        if (error.responseJSON) {
                            that.reset();
                        }
                    }
                );
        }
    });

    // Append form to view
    // Note the view is below the tab navs.
    // The elements should be defined in the template skeleton.
    this.userDetails.$el.appendTo(this.view.$el);

    // Init form
    this.userSettings = new Forms({
        schema: {
            current_password: {
                title: 'Current password',
                type: 'Password',
                validators: ['required'],
            },
            password: {
                title: 'New password',
                type: 'Password',
                validators: ['required'],
            },
            password_confirm: {
                title: 'Confirm new password',
                type: 'Password',
                validators: [
                    'required',
                    {
                        type: 'match',
                        field: 'password',
                        message: "Passwords doesn't match!",
                    },
                ],
            },
        },
        data: {
            current_password: '',
            password: '',
            password_confirm: '',
        },
        submitButton: 'Update password',
        cancelButton: 'Cancel',
        template: _.template(Templates.user_settings),
        templateData: {
            // Add title and description
            title: 'Password settings',
            description: 'Ac praesent eget in commodo. Pellentesque imperdiet sed sed faucibus pellentesque ipsum morbi. <br> Pretium semper commodo tortor cursus ultricies at nibh. Vulputate ornare posuere lobortis turpis.',
        },
    }).render();

    // On form submit
    this.userSettings.on('submit', function (event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
        }
    });

    // Append form to view
    // Note the view is below the tab navs.
    // The elements should be defined in the template skeleton.
    this.userSettings.$el.appendTo(this.view.$el);

    return this;
};
