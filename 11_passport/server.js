const express = require('express')
const app = express()

// HTTP server initialization to be used by websocket
const {Server: HTTPServer} = require('http')
const httpServer = new HTTPServer(app)

//Handlebars import and config
const handlebars = require("express-handlebars")
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials/"
})

// Product generator import for test route
const productGenerator = require('./utils/productGenerator')

// Session, Passport, Cookie Parser and Mongo Store imports
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const MongoStore = require('connect-mongo')

// mongoDB connection
const connectToMongoDB = require('./db/mongoDB')
connectToMongoDB()
    .then(() => console.log('Successfully connected to database.'))
    .catch((err) => console.log(`Could not connect to database. Error: ${err}`))

// Middleware imports
const checkAuthentication = require('./middlewares/checkAuthentication')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.engine("hbs", hbs.engine)

app.use(cookieParser())
app.use(session({
    store: new MongoStore({
        mongoUrl: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}/${process.env.MONGODB_SESSIONS}`,
        ttl: 60 * 10
    }),
    secret: 'very_secret',
    resave: true,
    saveUninitialized: true
}))

// Initializing modular websocket listener so as not to clutter this file
require('./websocket/socketListener')(httpServer)

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.post('/login', (req, res) => {
    req.session.user = req.body.name
    res.redirect('/')
})

app.get('/', (req, res) => {
    req.session.user ? res.render('root.hbs', {user: req.session.user}) : res.redirect('/login')
})

app.post('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/logout')
})

app.get('/logout', (req, res) => {
    res.sendFile(__dirname + '/public/logout.html')
})

app.get('/test-products', (req, res) => {
    let testProducts = productGenerator(5)
    res.render('test.hbs', { products: testProducts })
})

app.use(express.static('public'))

const PORT = 8080
httpServer.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`)
})

httpServer.on('error', error => console.log(`Server error: ${error}`))