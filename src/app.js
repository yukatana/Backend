//Express and compression middleware import and config
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const { infoLogger, warningLogger } = require('../logs')

// Session import
const session = require('express-session')
const sessionConfig = require('./middlewares/sessions/sessionConfig')
app.use(session(sessionConfig))

// Passport import
const { passport } = require('./middlewares/auth/passport')
app.use(passport.initialize())
app.use(passport.session())

// General middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(infoLogger) //Winston-based middleware logs all incoming requests to console

// Handlebars config import
const hbs = require('../views')
app.engine('hbs', hbs.engine)

// Router imports
const homeRouter = require('./routes/home/homeRouter')
const APIRouter = require('./routes/api/APIRouter')
const authRouter = require('./routes/auth/authRouter')
const testRouter = require('./routes/test/testRouter')
const infoRouter = require('./routes/info/infoRouter')

// GraphQL handler, schema and value imports
const {graphqlHTTP} = require('express-graphql')
const { schema, root } = require('./graphql')

// Router implementation
app.use('/', homeRouter)
app.use('/api', APIRouter)
app.use('/auth', authRouter)
app.use('/test', testRouter)
app.use('/info', infoRouter)
app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    }
))
app.use(express.static(process.cwd() + '/public'))

//Warn logger middleware records all wrong-path requests to logs/warn.log file
app.get('*', warningLogger, (req, res) => {
    res.status(404).send({error: '404 error - not found.'})
})

module.exports = app