const mongoose = require('mongoose')
const config = require('../../config')

connection = async () => {
    const URIString = `mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@${config.MONGODB_URI}/${config.MONGODB_DATABASE}`
    await mongoose.connect(URIString)
}

module.exports = connection