const model = require('../libs/model');

var post = Object.create(model("posts"));
post.schema = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
            required: true,
            minLength: 5,
            maxLength: 20,
            message:"required and can't be empty"
        },
        content: {
            type: 'string',
            required: true,
            minLength: 10,
            maxLength: 500,
            message:"required and can't be empty"
        },
        description:{
            type:'string',
        },
        postImg:{
            type:'string'
        }
    }

}
module.exports = post;