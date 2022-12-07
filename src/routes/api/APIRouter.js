const { Router } = require('express')
const APIRouter = Router()
const ProductsRouter = require('./products/productRouter')
const { generateRandoms } = require('../../controllers/API/APIController')

// Test view with random products
APIRouter.get('/randoms', generateRandoms)

// Nested router for products
APIRouter.use('/products', ProductsRouter)

module.exports = APIRouter