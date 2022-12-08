const { Router } = require('express')
const homeRouter = Router()
const checkAuthentication = require('../../middlewares/auth/checkAuthentication')
const homeController = require('../../API/controllers/homeController')

homeRouter.get('/', checkAuthentication, homeController.serveHomepage)

module.exports = homeRouter