const express = require('express')
const ratingRouter = express()
const ratingController = require('../controllers/ratingController')
const checkMiddleware = require('../middleware/checkMiddleware')

ratingRouter.post('/', ratingController.create)
ratingRouter.post('/change', ratingController.change)
ratingRouter.get('/', ratingController.getAll)

module.exports = ratingRouter