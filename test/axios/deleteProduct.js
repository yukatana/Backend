const axios = require('axios')
const { logger } = require('../../logs')
const BASE_URL = 'http://localhost:8080'
const TEST_DELETE_PRODUCT_ID = '63968c2faee07514abf5de56' // Manually change this to test product ID

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

const deleteProduct = async () => {
    const response = await axiosClient.delete(`${BASE_URL}/api/products/${TEST_DELETE_PRODUCT_ID}`)
    logger.info(response.data)
}

createSession().then(deleteProduct)