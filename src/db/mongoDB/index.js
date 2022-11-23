const config = require('../../config')
const mongoose = require('mongoose')
const { logger } = require('../../../logs')

// Building connection class based on singleton pattern - can only connect once
class MongoDBConnection {
    constructor() {}

    static connect = async () => {
        if (!this.connection) {
            try {
                const URIString = `mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@${config.MONGODB_URI}/${config.MONGODB_DATABASE}`
                this.connection = await mongoose.connect(URIString)
                return this.connection
            } catch (err) {
                logger.error(err)
                return false
            }
        } else {
            return this.connection
        }
    }
}

module.exports = MongoDBConnection