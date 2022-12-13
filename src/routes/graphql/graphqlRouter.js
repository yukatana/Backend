const { Router } = require('axios')
const graphqlRouter = Router()
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
    
`)

const root = {

}

graphqlRouter.use('/', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
    }
))

module.exports = graphqlRouter