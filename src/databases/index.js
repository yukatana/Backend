const config = require('../config')
const { logger } = require('../../logs')

const ConnectToDatabases = () => {
// Initializing MongoDB connection
    if (config.MESSAGE_PERSISTENCE === 'MongoDB' ||
        config.PRODUCT_PERSISTENCE === 'MongoDB') {
        const MongoDBConnection = require('./mongoDB')
        MongoDBConnection.connect()
            .then(() => logger.info('Successfully connected to MongoDB database.'))
            .catch((err) => logger.error(`Could not connect to MongoDB database. Error: ${err}`))
    }
}

module.exports = ConnectToDatabases