const { buildSchema } = require('graphql')
const ProductDAO = require('../factories/DAOFactory').getProductDAO()

const schema = buildSchema(`
    type Product {
        id: ID!
        name: String!
        price: Int!
        thumbnail: String!
    }
    
    type Query {
        getProduct(id: ID!): Product
        getProducts: [Product]
    }
    
    input ProductInput {
        name: String
        price: Int
        thumbnail: String
    }
    
    type Mutation {
        createProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductInput): Product
        deleteProduct(id: ID!): Product
    }
`)

const root = {
    getProduct: async ({id}) => {
        const product = await ProductDAO.getById(id)
        if (product) return product // guard clause
        if (product === false) throw new Error(`No product exists with ID ${id}.`)
    },
    getProducts: async () => {
        return await ProductDAO.getAll()
    },
    createProduct: async ({input}) => {
        const newProduct = await ProductDAO.save(input)
        if (newProduct) return newProduct //guard clause
        throw new Error(`There was an error while creating this product.`)
    },
    updateProduct: async ({id, input}) => {
        const updatedProduct = await ProductDAO.update(id, input)
        if (updatedProduct) return updatedProduct // guard clause
        if (updatedProduct === false) throw new Error(`No product exists with ID ${id}.`)
    },
    deleteProduct: async ({id}) => {
        const deletedProduct = await ProductDAO.delete(id)
        if (deletedProduct) return deletedProduct // guard clause
        if (deletedProduct === false) throw new Error(`No product exists with ID ${id}.`)
    }
}

module.exports = {
    schema,
    root
}