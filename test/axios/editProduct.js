const axios = require('axios')
const { logger } = require('../../logs')
const BASE_URL = 'http://localhost:8080'
const TEST_UPDATE_PRODUCT_ID = '63212b38543e2ab85053f63c'
const axiosInstance = axios.create({baseURL: BASE_URL})

const editProduct = async () => {
    // Test credentials used for subsequent request authentication
    const testCredentials = {
        username: 'test@gmail.com',
        password: 'test'
    }
    const logIn = await axios.post(`${BASE_URL}/auth/login`, testCredentials)
    // Adding session cookie to instance to be able to post to protected endpoint
    axiosInstance.defaults.headers.Cookie = logIn.headers["set-cookie"][0]
    logger.info(axiosInstance.defaults.headers.Cookie)
    const update = {
        price: 1000
    }
    const response = await axiosInstance.put(`${BASE_URL}/api/products/${TEST_UPDATE_PRODUCT_ID}`, update)
    logger.info(response.data)
}

editProduct()