//mongoDB data persistence class - messages version
const normalizr = require('normalizr')
const util = require('util')

module.exports = class mongoDBMessagesContainer {

    constructor(Schema) {
        this.Schema = Schema
    }

    getAll = async () => { //returns all messages
        try {
            const data = await this.Schema.find()
            const _data = data.map(msg => {
                return {...msg._doc, _id: msg._id.toString()}
            })
            const author = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'})
            const comments = new normalizr.schema.Entity('comment', {
                author
            }, {idAttribute: '_id'})
            // console.log('--------------------------------------------------')
            // console.log(util.inspect(_data, false, 5, true))
            // console.log('--------------------------------------------------')
            // console.log(util.inspect(normalizedData, false, 5, true))
            return normalizr.normalize(_data, [comments])
        } catch (err) {
            console.error(err)
        }
    }

    save = async (commentObject) => {
        try {
            return await new this.Schema(commentObject).save()
        } catch (err) {
            console.log(err)
        }
    }
}