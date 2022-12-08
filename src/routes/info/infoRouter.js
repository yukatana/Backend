const compression = require('compression')
const { Router } = require('express')
const infoRouter = Router()
const infoController = require('../../API/controllers/infoController')

infoRouter.get('/', compression(), infoController.serveProcessInfo)

module.exports = infoRouter
