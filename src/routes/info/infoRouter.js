const compression = require('compression')
const { Router } = require('express')
const infoRouter = Router()
const infoController = require('../../controllers/infoController')

infoRouter.get('/', compression(), infoController.serveProcessInfo)

module.exports = infoRouter
