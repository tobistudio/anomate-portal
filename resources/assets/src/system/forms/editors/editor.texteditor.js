/**
 * TextArea editor
 */
const $     = require('jquery');
const Form  = require('@/system/forms/base');

require('@/system/plugins/trumbowyg/dist/trumbowyg');

$.trumbowyg.svgPath = '/assets/icons.svg';

module.exports = Form.editors.Text.extend({
    tagName: 'textarea',

    /**
     * Override Text constructor so type property isn't set (issue #261)
     */
    initialize: function (options) {
        Form.editors.Base.prototype.initialize.call(this, options);

    },
    render:function(){
        
        let elem =  this.$el;

        //Insert options
        this.setValue(this.value);
        
        elem.ready(function(e){
            elem.trumbowyg({
                removeformatPasted: true,
                tagsToRemove: ['script', 'link'],
                autogrow: false,
                btnsDef: {
                    ai: {
                        title: 'Content Generator',
                        fn: function() {
                            alert('Content generated with ChatGPT');
                        },
                        ico: 'emoji',
                        text: 'Content suggestion (ChatGPT)',
                        hasIcon: false
                    }
                },
                btns: [
                    ['undo', 'redo'], // Only supported in Blink browsers
                    ['formatting'],
                    ['strong', 'em', 'del'],
                    ['superscript', 'subscript'],
                    ['link'],
                    ['insertImage'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    ['unorderedList', 'orderedList'],
                    ['horizontalRule'],
                    ['removeformat'],
                    ['ai']
                ]
            });
        });

        return this;
    }
});
