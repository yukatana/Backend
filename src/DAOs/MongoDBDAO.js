const logger = require('../../logs')

class MongoDBDAO {
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

module.exports = MongoDBDAO