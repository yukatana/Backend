const { logger } = require('../../logs')

// Factory import and DAO fetching
const factory = require('../factories/DAOFactory')
const ProductDAO = factory.getProductDAO()

const getProduct = async (req, res) => {
    const id = req.params.id
    let data
    try {
        // returns a single product or all products if no ID is specified
        id ? data = await ProductDAO.getById(id) : data = await ProductDAO.getAll()
        // checks whether the passed ID is valid
        if (data === false) {
            return res.status(400).json({error: 'Invalid ID format. Please, double check the ID and try again.'})
        }
        res.status(200).json(data)
    } catch (err) {
        logger.error(err)
        res.status(500).json({error: 'There was a server error while processing your request.'})
    }
}

const postProduct = async (req, res) => {
    const product = req.body
    if (!product) {
        return res.status(400).json({error: 'Please, re-submit your request with the proper fields.'})
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
        return res.status(400).json({error: 'Please, re-submit your request with the proper fields.'})
    }
    try {
        const _update = await ProductDAO.update(id, update)
        res.status(202).json(_update)
    } catch (err) {
        logger.error(err)
        res.status(500).json({error: 'There was a server error while processing your request.'})
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({error: 'Please, re-submit your request with the proper fields.'})
    }
    try {
        await ProductDAO.delete(id)
        res.status(200).json({success: `Successfully deleted product ID ${id}`})
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