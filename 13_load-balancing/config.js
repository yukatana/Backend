// Database credentials loaded in .env
require('dotenv').config()

// Set up port from CLI command on startup
const args = require('yargs')(process.argv.slice(2))
    .alias({
        p: 'port'
    })
    .default({
        port: 8080
    })
    .argv

const MONGODB_USERNAME = process.env.MONGODB_USERNAME
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DATABASE = 'socketServer'
const MONGODB_SESSIONS = 'sessions'
const PORT = args.port

module.exports = {
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_URI,
    MONGODB_DATABASE,
    MONGODB_SESSIONS,
    PORT
}