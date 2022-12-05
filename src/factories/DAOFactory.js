const config = require('../config')
const logger = require('../../logs')

class DAOFactory {

    constructor() {}

    static getProductDAO = () => {
        switch (config.PRODUCT_PERSISTENCE) {
            case 'MongoDB':
                return require('../DAOs/MongoDBDAO')
            default:
                logger.error(`Fatal error: please adjust PRODUCT_PERSISTENCE environment variable to match a supported persistence mechanism.`)
        }
    }

    static getMessageDAO = () => {
        switch (config.MESSAGE_PERSISTENCE) {
            case 'MongoDB':
                return require('../DAOs/MongoDBDAO')
            default:
                logger.error(`Fatal error: please adjust PRODUCT_PERSISTENCE environment variable to match a supported persistence mechanism.`)
        }
    }
}

module.exports = DAOFactory