// Dependecies
const $             = require('jquery');
const Backbone      = require('backbone');
const Form          = require('@/system/forms/base');
const _             = require('underscore');

module.exports = Form.editors.List.Modal.extend({
    initialize: function () {
        Form.editors.List.Modal.prototype.initialize.apply(this, arguments);

        let schema = this.schema;

        if (!schema.model) throw new Error('Missing required option "schema.model"');

        let nestedSchema = schema.model.prototype.schema;

        this.nestedSchema = _.isFunction(nestedSchema) ? nestedSchema() : nestedSchema;
    },

    /**
     * Returns the string representation of the object value
     */
    getStringValue: function () {
        let schema = this.schema,
            value = this.getValue();

        if (_.isEmpty(value)) return null;

        //If there's a specified toString use that
        if (schema.itemToString) return schema.itemToString(value);

        //Otherwise use the model
        return new schema.model(value).toString();
    },
});
