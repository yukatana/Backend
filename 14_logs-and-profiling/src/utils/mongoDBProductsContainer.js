//mongoDB data persistence class - products version
const logger = require('../../logs')

module.exports = class mongoDBProductsContainer {

    constructor(Schema) {
        this.Schema = Schema
    }

    getAll = async () => { //returns all messages
        try {
            return await this.Schema.find()
        } catch (err) {
            logger.error(err)
        }
    }

    save = async (object) => {
        try {
            return await new this.Schema(object).save()
        } catch (err) {
            logger.error(err)
        }
    }
}