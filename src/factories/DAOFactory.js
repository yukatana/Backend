const config = require('../config')
const { logger } = require('../../logs')

class DAOFactory {

    constructor() {}

    static getProductDAO = () => {
        switch (config.PRODUCT_PERSISTENCE) {
            case 'MongoDB':
                if (this.ProductDAO) {
                    return this.ProductDAO
                }
                const MongoDBDAO = require('../DAOs/MongoDBDAO')
                const productModel = require('../databases/mongoDB/models/product')
                this.ProductDAO = new MongoDBDAO(productModel)
                return this.ProductDAO
            default:
                logger.error(`Fatal error: please adjust PRODUCT_PERSISTENCE environment variable to match a supported persistence mechanism.`)
        }
    }

    static getMessageDAO = () => {
        switch (config.MESSAGE_PERSISTENCE) {
            case 'MongoDB':
                if (this.MessageDAO) {
                    return this.MessageDAO
                }
                const MongoDBDAO = require('../DAOs/MongoDBDAO')
                const messageModel = require('../databases/mongoDB/models/message')
                this.MessageDAO = new MongoDBDAO(messageModel)
                return this.MessageDAO
            default:
                logger.error(`Fatal error: please adjust PRODUCT_PERSISTENCE environment variable to match a supported persistence mechanism.`)
        }
    }
}

module.exports = DAOFactory