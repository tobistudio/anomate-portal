/**
 * Form library
 *
 * 
    let Form = require('@/system/forms/init');
    var form = new Forms({
        //Schema
        schema: {
            id:         {
                type: 'Select', // Editor type 
            },
        },
        //Data to populate the form with
        data: {
          id: 123,
          name: 'Rod Kimble',
          password: 'cool beans'
        }
    }).render();
 */
 
// Form base view
const Form = require('@/system/forms/base');

// Validators
Form.validators = require('@/system/forms/validators');
Form.validators = new Form.validators;

// Form template settings
Form.templateSettings = require('@/system/forms/templates/settings');
Form.template = require('@/system/forms/templates/base');

// Fieldset
Form.Fieldset = require('@/system/forms/fieldset');
Form.Field = require('@/system/forms/field');

// Editors types for fields
Form.Editor = Form.editors.Base = require('@/system/forms/editors/editor.base');
Form.editors.Text = require('@/system/forms/editors/editor.text');
Form.editors.TextArea = require('@/system/forms/editors/editor.textarea');
Form.editors.TextEditor = require('@/system/forms/editors/editor.texteditor');
Form.editors.FileUploader = require('@/system/forms/editors/editor.fileuploader');
Form.editors.Password = require('@/system/forms/editors/editor.password');
Form.editors.Number = require('@/system/forms/editors/editor.number');
Form.editors.Hidden = require('@/system/forms/editors/editor.hidden');
Form.editors.Select = require('@/system/forms/editors/editor.select');
Form.editors.Dropdown = require('@/system/forms/editors/editor.dropdown');
Form.editors.Checkbox = require('@/system/forms/editors/editor.checkbox');
Form.editors.Radio = require('@/system/forms/editors/editor.radio');
Form.editors.Checkboxes = require('@/system/forms/editors/editor.checkboxes');
Form.editors.Object = require('@/system/forms/editors/editor.object');
Form.editors.NestedModel = require('@/system/forms/editors/editor.nestedmodel');
Form.editors.Date = require('@/system/forms/editors/editor.date');
Form.editors.DateTime = require('@/system/forms/editors/editor.datetime');
Form.editors.List = require('@/system/forms/editors/editor.list');
Form.editors.List.Item = require('@/system/forms/editors/editor.list.item');
Form.editors.List.Modal = require('@/system/forms/editors/editor.list.modal');
Form.editors.List.Object = require('@/system/forms/editors/editor.list.object');
Form.editors.List.NestedModel = require('@/system/forms/editors/editor.list.nestedmodel');

// Metadata
Form.VERSION = '1.0.0';

module.exports = Form.extend();