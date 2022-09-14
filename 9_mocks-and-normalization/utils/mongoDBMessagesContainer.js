//mongoDB data persistence class - messages version

module.exports = class mongoDBMessagesContainer {

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