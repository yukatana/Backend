//Winston log config import
const { infoLogger, warningLogger } = require('../logs')

//Express and compression middleware import and config
const express = require('express')
const app = express()
const compression = require('compression')

// Router imports
const APIRouter = require('./routes/api/APIRouter')
const authRouter = require('./routes/auth/authRouter')

//Handlebars import and config
const handlebars = require("express-handlebars")
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: "./views/layout",
    partialsDir: "./views/partials/"
})

// Product generator import for test route
const productGenerator = require('./utils/productGenerator')

// Cookie Parser and Mongo Store imports
const cookieParser = require('cookie-parser')

// mongoDB connection
const connectToMongoDB = require('./db/mongoDB')
connectToMongoDB()
    .then(() => console.log('Successfully connected to database.'))
    .catch((err) => console.log(`Could not connect to database. Error: ${err}`))

// Session import
const session = require('express-session')
const sessionConfig = require('./middlewares/sessions/sessionConfig')
app.use(session(sessionConfig))

// Passport import
const { passport } = require('./middlewares/auth/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.engine("hbs", hbs.engine)

//Winston-based middleware logs all incoming requests to console
app.use(infoLogger)

app.get('/', checkAuthentication, (req, res) => {
    res.render('root.hbs', {user: req.session.user})
})

app.get('/test-products', (req, res) => {
    let testProducts = productGenerator(5)
    res.render('test.hbs', { products: testProducts })
})

app.get('/info', compression(), (req, res) => {
    const processInfo = {
        args: process.argv.splice(2),
        path: process.cwd(),
        operatingSystem: process.platform,
        processId: process.pid,
        title: process.title,
        nodeVersion: process.version,
        folder: __dirname,
        memory: `${process.memoryUsage().rss/1e6} MB`
    }
    //console.log(processInfo)
    res.render('info.hbs', processInfo)
})

app.use('/api', APIRouter)
app.use('/auth', authRouter)

app.use(express.static(__dirname + '/public'))

//Warn logger middleware records all wrong-path requests to logs/warn.log file
app.get('*', warningLogger, (req, res) => {
    res.status(404).send({error: '404 error - not found.'})
})

module.exports = app