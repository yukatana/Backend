const { Router } = require('express')
const testRouter = Router()
const testController = require('../../controllers/testController')

testRouter.get('/', testController.generateRandoms)

module.exports = testRouter