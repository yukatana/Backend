const logger = require('../../logs')

class MongoDBDAO {
    constructor(Model) {
        this.Model = Model
    }

    getAll = async () => { //returns all messages
        try {
            return await this.Model.find()
        } catch (err) {
            logger.error(err)
        }
    }

    save = async (object) => {
        try {
            return await new this.Model(object).save()
        } catch (err) {
            logger.error(err)
        }
    }
}

module.exports = MongoDBDAO