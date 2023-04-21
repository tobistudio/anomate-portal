/**
 * Fileuploader
 */
const $             = require('jquery');
const Form          = require('@/system/forms/base');
const { Dropzone }  = require('@/system/plugins/dropzone/dropzone');

module.exports = Form.editors.Text.extend({
    tagName: 'div',
    className: 'dropzone',
    events: {
        addedfile: function (event) {
            console.log(event);
        }
    },
    /**
     * Override Text constructor so type property isn't set (issue #261)
     */
    initialize: function (options) {
        Form.editors.Base.prototype.initialize.call(this, options);
    },
    render:function(){
        
        this.setValue(this.value);

        let that = this;

        that.$el.dropzone({
            url: "https://app.anomate.co/wp-json/anomate/v1/upload",
            headers:{
                'api-token':window.$app.api_token
            },
            init:function(file) {
                // If you only have access to the original image sizes on your server,
                // and want to resize them in the browser:
                let mockFile = { name: "Filename 2"};
                if (that.value!="") {
                    this.displayExistingFile(mockFile,that.value);
                }
            },
            parallelUploads:1,
            maxFiles:1,
            thumbnailWidth:null,
            thumbnailHeight:150,
            thumbnailMethod:'contain',
            addRemoveLinks:true,
            hiddenInputContainer:that.$el[0]
        });
        
        console.log(this);
        
        return this;
        
    }
});