//mongoDB data persistence class - products version

module.exports = class mongoDBProductsContainer {

    constructor(Schema) {
        this.Schema = Schema
    }

    getAll = async () => { //returns all messages
        try {
            return await this.Schema.find()
        } catch (err) {
            console.error(err)
        }
    }

    save = async (object) => {
        try {
            return await new this.Schema(object).save()
        } catch (err) {
            console.log(err)
        }
    }
}