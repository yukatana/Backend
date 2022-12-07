const { logger } = require('../../logs')
const { Types } = require('mongoose')

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
        if (!Types.ObjectId.isValid(id)) {
            return false
        }
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
        if (!Types.ObjectId.isValid(id)) {
            return false
        }
        try {
            return await this.Model.findByIdAndUpdate(id, update)
        } catch (err) {
            logger.error(err)
            return err
        }
    }

    delete = async (id) => {
        if (!Types.ObjectId.isValid(id)) {
            return false
        }
        try {
            return await this.Model.findByIdAndDelete(id)
        } catch (err) {
            logger.error(err)
            return err
        }
    }
}

module.exports = MongoDBDAO