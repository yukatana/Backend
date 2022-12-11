const axios = require('axios')
const { logger } = require('../../logs')
const BASE_URL = 'http://localhost:8080'
const TEST_DELETE_PRODUCT_ID = '63212b38543e2ab85053f63c'
const axiosInstance = axios.create({baseURL: BASE_URL})

const deleteProduct = async () => {
    // Test credentials used for subsequent request authentication
    const testCredentials = {
        username: 'test@gmail.com',
        password: 'test'
    }
    const logIn = await axios.post(`${BASE_URL}/auth/login`, testCredentials)
    // Adding session cookie to instance to be able to post to protected endpoint
    axiosInstance.defaults.headers.Cookie = logIn.headers["set-cookie"][0]
    logger.info(axiosInstance.defaults.headers.Cookie)
    const response = await axiosInstance.delete(`${BASE_URL}/api/products/${TEST_DELETE_PRODUCT_ID}`)
    logger.info(response.data)
}

deleteProduct()