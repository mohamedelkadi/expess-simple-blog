/**
 * Created by molhm on 6/13/16.
 */
const model = require('../libs/model');

var user = Object.create(model("users"));
user.schema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            required: true,
            minLength: 5,
            maxLength: 15,
            message: "required and can't be empty"
        },
        email: {
            type: 'string',
            required: true,
            minLength: 5,
            maxLength: 15,
            message: "not valid email"
        },
        password: {
            type: 'string',
            required: true,

        }
    }

}
module.exports = user;