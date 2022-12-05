const config = require('../config')
const logger = require('../../logs')

class DAOFactory {

    constructor() {}

    static getProductDAO = (ProductSchema) => {
        switch (config.PRODUCT_PERSISTENCE) {
            case 'MongoDB':
                const MongoDBDAO = require('../DAOs/MongoDBDAO')
                return new MongoDBDAO(ProductSchema)
            default:
                logger.error(`Fatal error: please adjust PRODUCT_PERSISTENCE environment variable to match a supported persistence mechanism.`)
        }
    }

    static getMessageDAO = (MessageSchema) => {
        switch (config.MESSAGE_PERSISTENCE) {
            case 'MongoDB':
                const MongoDBDAO = require('../DAOs/MongoDBDAO')
                return new MongoDBDAO(MessageSchema)
            default:
                logger.error(`Fatal error: please adjust PRODUCT_PERSISTENCE environment variable to match a supported persistence mechanism.`)
        }
    }
}

module.exports = DAOFactory