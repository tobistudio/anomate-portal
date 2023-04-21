// Dependecies
const $             = require('jquery');
const Backbone      = require('backbone');
const Form          = require('@/system/forms/base');
const _             = require('underscore');

module.exports = Form.editors.List.Modal.extend({
    className:'',
    initialize: function () {
        Form.editors.List.Modal.prototype.initialize.apply(this, arguments);

        let schema = this.schema;

        if (!schema.subSchema) throw new Error('Missing required option "schema.subSchema"');

        this.nestedSchema = schema.subSchema;
    },
});