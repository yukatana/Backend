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
            const author = new normalizr.schema.Entity('author')
            //comment schema contains both of the above schemas
            const comments = new normalizr.schema.Entity('comment', {
                author
            })
            // let data = await this.getAll()
            // data.comments = []
            // data.comments.push(commentObject)
            // data = {id: 'comments', ...data}
            let data = {
                id: 'comments',
                comments: [
                    {
                        author: {
                            id: 'rommel.aranguren@gmail.com',
                            name: '',
                            last_name: '',
                            age: '',
                            alias: '',
                            avatar: ''
                        },
                        message: { text: 'hello', dateString: '9/14/2022, 11:05:34 AM' }
                    },
                    {
                        author: {
                            id: 'rommel.aranguren@gmail.com',
                            name: '',
                            last_name: '',
                            age: '',
                            alias: '',
                            avatar: ''
                        },
                        message: { text: 'hello', dateString: '9/14/2022, 11:05:34 AM' }
                    },
                    {
                        author: {
                            id: 'rommel.aranguren@gmail.com',
                            name: '',
                            last_name: '',
                            age: '',
                            alias: '',
                            avatar: ''
                        },
                        message: { text: 'hello', dateString: '9/14/2022, 11:05:34 AM' }
                    }
                ]
            }
            console.log(util.inspect(data, true, 5, true))
            console.log('--------------------------------------------------')
            const normalizedData = normalizr.normalize(data, [comments])
            console.log('--------------------------------------------------')
            console.log(util.inspect(normalizedData, true, 5, true))
            // console.log('--------------------------------------------------')
            // const denormalizedData = normalizr.denormalize(normalizedData.result, commentSchema, normalizedData.entities)
            // console.log(util.inspect(denormalizedData, true, 5, true))
            // return await new this.Schema(commentObject).save()
        } catch (err) {
            console.log(err)
        }
    }
}