const { Schema, model } = require('mongoose')


const MessageSchema = new Schema({
    author: {type: Object, required: true},
    dateString: {type: String, required: true},
    text: {type: String, required: true}
}, {timestamps: true})

const Message = model('messages', MessageSchema)

module.exports = Message