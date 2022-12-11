const axios = require('axios')
const { logger } = require('../../logs')
const BASE_URL = 'http://localhost:8080'
const axiosInstance = axios.create({baseURL: BASE_URL})

const createSession = async () => {
    // Test credentials used for subsequent request authentication
    const testCredentials = {
        username: 'test@gmail.com',
        password: 'test'
    }
    const logIn = await axios.post(`${BASE_URL}/auth/login`, testCredentials)
    // Adding session cookie to instance to be able to post to protected endpoint
    axiosInstance.defaults.headers.Cookie = logIn.headers["set-cookie"][0]
    logger.info(axiosInstance.defaults.headers.Cookie)
}

const addProduct = async () => {
    const product = {
        name: 'Candida albicans',
        price: 500,
        thumbnail: 'https://drfungus.org/wp-content/uploads/2017/02/candida.jpg'
    }
    const response = await axiosInstance.post(`${BASE_URL}/api/products/`, product)
    logger.info(response)
}

createSession().then(addProduct)