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
    email_preferences  : require('@/templates/users/email-settings/email-preferences.html'),
};

module.exports = function (params) {

    // Define user model
    this.store =  new Store();

    //
    // Define base view
    //
    this.view = new Layout();
    this.view.render();
    
    // Init form
    this.emailSettings = new Forms({
        schema       : {
            double_optin : {
                title       :   "Enable double opt-in",
                type        :   "Checkbox",
                help        :   "Description of double opt-in. Ullamcorper id condimentum eros facilisis ac congue cursus at nisl. Ipsum aenean in dignissim integer dictum elit mauris ullamcorper.",
            },
            double_optin_content : {
                title       :   false,
                type        :   "TextEditor",
            },
            gdpr : {
                title       :   "Enable GDPR fields on signup forms",
                type        :   "Checkbox",
                help        :   "Some description. Aliquam varius congue a vulputate eleifend eget aliquam. Tempor nulla congue sollicitudin ut id.",
            },
            gdpr_content : {
                title       :   false,
                type        :   "TextEditor",
            },
            unsubscribe_goodby : {
                title       :   "Send unsubscribe goodbye email notification",
                type        :   "Checkbox",
                help        :   "Some description. Enim arcu et pellentesque hac vitae maecenas lectus blandit consequat. Vel ut porttitor eget lacus.",
            },
            unsubscribe_goodby_content : {
                title       :   false,
                type        :   "TextEditor"
            },
            consent_by_default : {
                title       :   "Tick the consent checkbox by default",
                type        :   "Checkbox",
                help        :   "This option will consent the users by default. If enabled, user would need to untick this box in order to be excluded from marketing communication emails",
            },
            consent_by_default_content : {
                title       :   false,
                type        :   "TextEditor",
            },
        },
        data         : {
            double_optin:true,
            double_optin_content:'<h3>Lorem ipsum dolor sit amet, has labore semper probatus cu, et magna tibique mei. Assum dicam honestatis vim in. Et vix nulla eligendi. Rebum periculis neglegentur vis ut,<em>&nbsp;ius ea quidam equidem delenit, at eam labore oporteat liberavisse. Omnis harum no vis, suas facer inermis at his. Et elitr voluptua pericula nam, per no atqui quodsi.</em></h3><p>Lorem ipsum dolor sit amet, has labore semper probatus cu, et magna tibique mei. Assum dicam honestatis vim in. Et vix nulla eligendi. Rebum periculis neglegentur vis ut,<em>&nbsp;ius ea quidam equidem delenit, at eam labore oporteat liberavisse. Omnis harum no vis, suas facer inermis at his. Et elitr voluptua pericula nam, per no atqui quodsi.</em></p><p><br style="letter-spacing: -0.16px;"></p>'
        },
        submitButton : "Update preferences",
        cancelButton : "Cancel",
        template     : _.template(Templates.email_preferences),
        templateData : {
            // Add title and description
            title: 'Email preferences',
            description: 'Ac praesent eget in commodo. Pellentesque imperdiet sed sed faucibus pellentesque ipsum morbi. Pretium semper commodo tortor cursus ultricies at nibh. Vulputate ornare posuere lobortis turpis.'
        }
    }).render();
    
    // Toggle content based on selection
    this.toggleContent = function(field,value) {
        if (this.emailSettings.fields[field+'_content'].$el.length>0) {
           if (value) {
                this.emailSettings.fields[field+'_content'].$el.show();
            } else {
                this.emailSettings.fields[field+'_content'].$el.hide();
            }
        }
    };
    
    // Set initial state for the TextArea content
    _.each(this.emailSettings.getValue(),function(value,key) {
        if (key=='consent_by_default'||key=='double_optin'||key=='gdpr'||key=='unsubscribe_goodby') {
            let isChecked = this.emailSettings.getValue(key);
            this.toggleContent(key,isChecked);
            // On form submit
            this.emailSettings.on(key+':change',function(event,field) {
                this.toggleContent(field.key,this.emailSettings.getValue(field.key));
            },this);
        }
    },this);

    // On form submit
    this.emailSettings.on('submit',function(event) {
        let that = this;
        // If the form commit suceed
        if (!this.validate()) {
            console.log(that.getValue());
        }
    });

    // Append form to view
    // Note the view is below the tab navs. 
    // The elements should be defined in the template skeleton.
    this.emailSettings.$el.appendTo(this.view.$el);
    
    return this;
    
};
