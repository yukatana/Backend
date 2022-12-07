const { logger } = require('../../../logs')

// Factory import and DAO fetching
const factory = require('../../factories/DAOFactory')
const ProductDAO = factory.getProductDAO()

const getProduct = async (req, res) => {
    const id = req.params.id
    let data
    try {
        // returns a single product or all products if no ID is specified
        id ? data = await ProductDAO.getById(id) : data = await ProductDAO.getAll()
        res.status(200).json(data)
    } catch (err) {
        logger.error(err)
        res.status(500).json({error: 'There was a server error while processing your request.'})
    }
}

const postProduct = async (req, res) => {
    const product = req.body
    if (!product) {
        res.status(400).json({error: 'Please, re-submit your request with the proper fields.'})
    }
    try {
        const _product = await ProductDAO.save(product)
        res.status(201).json(_product)
    } catch (err) {
        logger.error(err)
        res.status(500).json({error: 'There was a server error while processing your request.'})
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id
    const update = req.params.body
    if (!id || !update) {
        res.status(400).json({error: 'Please, re-submit your request with the proper fields.'})
    }
    try {
        const _update = await ProductDAO.update(id, update)
        res.status(202).json(_update)
    } catch (err) {
        logger.error(err)
        res.status(500).json({error: 'There was a server error while processing your request.'})
    }
}

const deleteProduct = (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).json({error: 'Please, re-submit your request with the proper fields.'})
    }
    try {
        ProductDAO.delete(id)
    } catch (err) {
        logger.error(err)
        res.status(500).json({error: 'There was a server error while processing your request.'})
    }
}

module.exports = {
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct
}