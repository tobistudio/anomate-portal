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
    store_admins: require('@/templates/users/users/store-admins.html'),
    store_users_list: require('@/templates/snippets/list-store-users.html'),
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

    let content = 'Ac praesent eget in commodo. Pellentesque imperdiet sed sed faucibus pellentesque ipsum morbi. Pretium semper commodo tortor cursus ultricies at nibh. Vulputate ornare posuere lobortis turpis.';

    // Init form
    this.admins = new Forms({
        schema: {
            //We use our nested model in List Items here.
            users: {
                title: false,
                type: 'List',
                itemType: 'Object',
                confirmDelete: 'Are you sure that you want to delete this user?',
                itemToString: function (value,schema) {
                    
                    this.template = _.template(Templates.store_users_list);
                    
                    this.template = this.template({
                        data: value,
                        schema: schema.subSchema,
                    });
                    
                    return this.template;
                    
                },
                subSchema: {
                    name: {
                        title: 'First Name',
                        type: 'Text',
                        validators: ['required'],
                    },
                    surname: {
                        title: 'Last Name',
                        type: 'Text',
                        validators: ['required'],
                    },
                    email: {
                        title: 'Email',
                        type: 'Text',
                        validators: ['required'],
                    },
                    phone: {
                        title: 'Phone',
                        type: 'Text',
                        validators: ['required'],
                    },
                },
            },
        },
        data: {
            users: [
                {
                    name: 'Astrit',
                    surname: 'Lala',
                    email: 'astrit.lala88@gmail.com',
                    login:'Last login was on Wednesday, March 1, 2023 at 11:33 GMT+8.'
                },
                {
                    name: 'Guy',
                    surname: 'Azouri',
                    email: 'guy@anova.co',
                    login:'Last login was on Wednesday, March 1, 2023 at 11:33 GMT+8.'
                },
                {
                    name: 'Vladimir',
                    surname: 'Isaev',
                    email: 'qudwill@gmail.com',
                    login:'Last login was on Wednesday, March 1, 2023 at 11:33 GMT+8.'
                }
            ],
        },
        template: _.template(Templates.store_admins),
        templateData: {
            // Add title and description
            title: 'Admins',
            description: content
        },
    }).render();
    
    // On form submit
    this.admins.on('preferences:add', function (event) {
        console.log(this);
    });
    
    // On form submit
    this.admins.on('preferences:change', function (event) {
        console.log(this);
    });
    
    // On form submit
    this.admins.on('submit', function (event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
            console.log(that);
        }
    });

    // Append form to view
    // Note the view is below the tab navs.
    // The elements should be defined in the template skeleton.
    this.admins.$el.appendTo(this.view.$el);


   // Init form
    this.employees = new Forms({
        schema: {
            //We use our nested model in List Items here.
            users: {
                title: false,
                type: 'List',
                itemType: 'Object',
                confirmDelete: 'Are you sure that you want to delete this user?',
                itemToString: function (value,schema) {
                    
                    this.template = _.template(Templates.store_users_list);
                    
                    console.log(value);
                    
                    this.template = this.template({
                        data: value,
                        schema: schema.subSchema,
                    });
                    
                    return this.template;
                    
                },
                subSchema: {
                    name: {
                        title: 'First Name',
                        type: 'Text',
                        validators: ['required'],
                    },
                    surname: {
                        title: 'Last Name',
                        type: 'Text',
                        validators: ['required'],
                    },
                    email: {
                        title: 'Email',
                        type: 'Text',
                        validators: ['required'],
                    },
                },
            },
        },
        data: {
            users: [
                {
                    name: 'Astrit',
                    surname: 'Lala',
                    email: 'astrit.lala88@gmail.com',
                    login:'Last login was on Wednesday, March 1, 2023 at 11:33 GMT+8.'
                },
                {
                    name: 'Guy',
                    surname: 'Azouri',
                    email: 'guy@anova.co',
                    login:'Last login was on Wednesday, March 1, 2023 at 11:33 GMT+8.'
                },
                {
                    name: 'Vladimir',
                    surname: 'Isaev',
                    email: 'qudwill@gmail.com',
                    login:'Last login was on Wednesday, March 1, 2023 at 11:33 GMT+8.'
                }
            ],
        },
        template: _.template(Templates.store_admins),
        templateData: {
            // Add title and description
            title: 'Employees',
            description: content
        },
    }).render();
    
    // On form submit
    this.employees.on('preferences:add', function (event) {
        console.log(this);
    });
    
    // On form submit
    this.employees.on('preferences:change', function (event) {
        console.log(this);
    });
    
    // On form submit
    this.employees.on('submit', function (event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
            console.log(that);
        }
    });

    // Append form to view
    // Note the view is below the tab navs.
    // The elements should be defined in the template skeleton.
    this.employees.$el.appendTo(this.view.$el);



    return this;
};
