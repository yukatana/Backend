const { Router } = require('express')
const ProductsRouter = Router()
const checkAuthentication = require('../../../middlewares/auth/checkAuthentication')
const productsController = require('../../../API/productsController')

// GET a product or all products
ProductsRouter.get('/:id?', productsController.getProduct)
// POST a new product
ProductsRouter.post('/', checkAuthentication, productsController.postProduct)
// PUT a product update
ProductsRouter.put('/:id', checkAuthentication, productsController.updateProduct)
// DELETE a product
ProductsRouter.delete('/:id', checkAuthentication, productsController.deleteProduct)

module.exports = ProductsRouter