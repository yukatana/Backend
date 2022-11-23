const config = require('../../config')
const mongoose = require('mongoose')
const { logger } = require('../../../logs')

class MongoDBConnection {
    constructor() {}

    static getInstance = () => {

    }

    static connect = async () => {
        if (!connectionInstance) {
            const connectionInstance = new MongoDBConnection()
            try {
                const URIString = `mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@${config.MONGODB_URI}/${config.MONGODB_DATABASE}`
                await mongoose.connect(URIString)
                return true
            } catch (err) {
                logger.error(err)
                return false
            }
        } else {
            return this.conne
        }


    }
}


module.exports = MongoDBConnection