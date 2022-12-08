const config = require('../../config')
const mongoose = require('mongoose')
const { logger } = require('../../../logs')

// Building connection class based on singleton pattern - can only connect and instantiate once
class MongoDBConnection {
    static instance
    static connection

    constructor() {
        if (MongoDBConnection.instance) {
            return MongoDBConnection.instance
        }
        MongoDBConnection.instance = new MongoDBConnection()
        return MongoDBConnection.instance
    }

    static connect = async () => {
        if (!MongoDBConnection.connection) {
            try {
                const URIString = `mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@${config.MONGODB_URI}/${config.MONGODB_DATABASE}`
                MongoDBConnection.connection = await mongoose.connect(URIString)
                return MongoDBConnection.connection
            } catch (err) {
                logger.error(err)
                return err
            }
        } else {
            return MongoDBConnection.connection
        }
    }
}

module.exports = MongoDBConnection