//mongoDB data persistence class - messages version
const normalizr = require('normalizr')
const util = require('util')

module.exports = class mongoDBMessagesContainer {

    constructor(Schema) {
        this.Schema = Schema
    }

    getAll = async () => { //returns all messages
        try {
            return await this.Schema.find()
        } catch (err) {
            console.error(err)
        }
    }

    save = async (commentObject) => {
        try {
            const author = new normalizr.schema.Entity('authors')
            const message = new normalizr.schema.Entity('message', {}, {idAttribute: 'text'})
            //commentSchema contains both of the above schemas
            const comment = new normalizr.schema.Entity('comments', {
                author: author,
                message: message
            })
            let data = await this.getAll()
            data.comments = []
            data.comments.push(commentObject)
            data = {id: 'comments', ...data}
            console.log('--------------------------------------------------')
            console.log(util.inspect(data, true, 5, true))
            const normalizedData = normalizr.normalize(data, [comment])
            console.log('--------------------------------------------------')
            console.log(util.inspect(normalizedData, true, 5, true))
            // console.log('--------------------------------------------------')
            // const denormalizedData = normalizr.denormalize(normalizedData.result, commentSchema, normalizedData.entities)
            // console.log(util.inspect(denormalizedData, true, 5, true))

            //return await new this.Schema(commentObject).save()
        } catch (err) {
            console.log(err)
        }
    }
}