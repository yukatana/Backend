//Winston log config import
const { infoLogger, warningLogger } = require('../logs')

//Express and compression middleware import and config
const express = require('express')
const app = express()
const config = require('./config')
const compression = require('compression')

// Router imports
const APIRouter = require('./routes/api/APIRouter')

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
const MongoStore = require('connect-mongo')

// mongoDB connection
const connectToMongoDB = require('./db/mongoDB')
connectToMongoDB()
    .then(() => console.log('Successfully connected to database.'))
    .catch((err) => console.log(`Could not connect to database. Error: ${err}`))

// Middleware imports
const checkAuthentication = require('./middlewares/checkAuthentication')

// Passport import, initialization, and configuration
const session = require('express-session')
const passport = require('passport')
const { loginStrategy, signupStrategy } = require('./middlewares/auth/passportStrategies')
const LocalStrategy = require('passport-local').Strategy
passport.use('login', new LocalStrategy(loginStrategy))
passport.use('signup', new LocalStrategy(
    {passReqToCallback: true},
    signupStrategy)
)
// Types and User schema to be used by deserialize
const { Types } = require('mongoose')
const User = require('./db/mongoDB/schemas/user')
passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id)
    const user = await User.findById(id)
    done(null, user)
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.engine("hbs", hbs.engine)
app.use(cookieParser())
app.use(session({
    store: new MongoStore({
        mongoUrl: `mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@${config.MONGODB_URI}/${config.MONGODB_SESSIONS}`,
        ttl: 60 * 10
    }),
    secret: 'very_secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

//Winston-based middleware logs all incoming requests to console
app.use(infoLogger)

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
})

app.post('/signup', passport.authenticate('signup',
    {failureRedirect: '/signupError'}),
    (req, res) => {
        req.session.user = req.user.username
        res.redirect('/')
        }
)

app.get('/signupError', (req, res) => {
    res.sendFile(__dirname + '/public/signupError.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.post('/login', passport.authenticate('login',
    {failureRedirect: '/loginError'}),
    (req, res) => {
        req.session.user = req.user.username
        res.redirect('/')
})

app.get('/loginError', (req, res) => {
    res.sendFile(__dirname + '/public/loginError.html')
})

app.get('/', checkAuthentication, (req, res) => {
    res.render('root.hbs', {user: req.session.user})
})

app.post('/logout', (req, res) => {
    req.session.destroy()
    req.logout(() => res.redirect('/logout'))
})

app.get('/logout', (req, res) => {
    res.sendFile(__dirname + '/public/logout.html')
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

app.use(express.static(__dirname + '/public'))

//Warn logger middleware records all wrong-path requests to logs/warn.log file
app.get('*', warningLogger, (req, res) => {
    res.status(404).send({error: '404 error - not found.'})
})

module.exports = app