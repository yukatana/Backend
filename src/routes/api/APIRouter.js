const { Router } = require('express')
const APIRouter = Router()
const {
    generateRandoms
} = require('../../controllers/APIController')

APIRouter.get('/randoms', generateRandoms)

module.exports = APIRouter