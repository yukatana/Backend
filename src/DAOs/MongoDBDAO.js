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
            return err
        }
    }

    getById = async (id) => {
        try {
            return await this.Model.findById(id)
        } catch (err) {
            logger.error(err)
            return err
        }
    }

    save = async (object) => {
        try {
            return await new this.Model(object).save()
        } catch (err) {
            logger.error(err)
            return err
        }
    }

    update = async (id, update) => {
        try {
            return await this.Model.findByIdAndUpdate(id, update)
        } catch (err) {
            logger.error(err)
            return err
        }
    }

    delete = async (id) => {
        try {
            return await this.Model.findByIdAndDelete(id)
        } catch (err) {
            logger.error(err)
            return err
        }
    }
}

module.exports = MongoDBDAO