const axios = require('axios')
const { logger } = require('../../logs')
const BASE_URL = 'http://localhost:8080'

// Adding CookieJar to Axios for session cookie storage
const { wrapper } = require('axios-cookiejar-support')
const { CookieJar } = require('tough-cookie')
const jar = new CookieJar()
const axiosClient = wrapper(axios.create({ jar }))

const createSession = async () => {
    // Test credentials used for subsequent request authentication
    const testCredentials = {
        username: 'test@gmail.com',
        password: 'test'
    }
    await axiosClient.post(`${BASE_URL}/auth/login`, testCredentials)
}

const addProduct = async () => {
    const product = {
        name: 'Candida albicans',
        price: 500,
        thumbnail: 'https://drfungus.org/wp-content/uploads/2017/02/candida.jpg'
    }
    const response = await axiosClient.post(`${BASE_URL}/api/products/`, product)
    logger.info(response.data)
}

createSession().then(addProduct)