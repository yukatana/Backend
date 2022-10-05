require('dotenv').config()
const yargs = require('yargs')

const MONGODB_USERNAME = process.env.MONGODB_USERNAME
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DATABASE = 'socketServer'
const MONGODB_SESSIONS = 'sessions'
const PORT = process.env.PORT

module.exports = {
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_URI,
    MONGODB_DATABASE,
    MONGODB_SESSIONS,
    PORT
}