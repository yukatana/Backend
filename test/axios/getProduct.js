const axios = require('axios')
const { logger } = require('../../logs')
const BASE_URL = 'http://localhost:8080'

const getProducts = async () => {
    const response = await axios.get(`${BASE_URL}/api/products/`)
    logger.info(response.data)
}

getProducts()