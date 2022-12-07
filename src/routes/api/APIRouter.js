const { Router } = require('express')
const APIRouter = Router()
const ProductsRouter = require('./products/productRouter')
const MessagesRouter = require('./messages/messageRouter')
const { generateRandoms } = require('../../controllers/API/APIController')

// Test view with random products
APIRouter.get('/randoms', generateRandoms)

// Nested routers for products and messages
APIRouter.use('/products', ProductsRouter)
APIRouter.use('/messages', MessagesRouter)

module.exports = APIRouter