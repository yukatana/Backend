const config = require('../config')

const ConnectToDatabases = () => {
// Initializing MongoDB connection
    if (config.MESSAGE_PERSISTENCE === 'MongoDB' ||
        config.PRODUCT_PERSISTENCE === 'MongoDB') {
        const MongoDBConnection = require('./mongoDB')
        MongoDBConnection.connect()
            .then(() => console.log('Successfully connected to database.'))
            .catch((err) => console.log(`Could not connect to database. Error: ${err}`))
    }
}

module.exports = ConnectToDatabases