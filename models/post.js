const model = require('../libs/model');

var post = Object.create(model("posts"));
post.schema = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
            required: true
        },
        content: {
            type: 'string',
            required: true
        }
    }

}
module.exports = post;