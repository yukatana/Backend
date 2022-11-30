const normalizr = require('normalizr')

class messagesRepository {
    static processAllMessages = (data) => {
        const _data = data.map(msg => {
            return {...msg._doc, _id: msg._id.toString()}
        })
        const author = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'})
        const comments = new normalizr.schema.Entity('comment', {
            author
        }, {idAttribute: '_id'})
        return normalizr.normalize(_data, [comments])
    }
}