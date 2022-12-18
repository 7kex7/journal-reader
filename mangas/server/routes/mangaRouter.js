const express = require('express')
const mangaRouter = express()
const mangaController = require('../controllers/mangaController.js')
const checkMiddleware = require('../middleware/checkMiddleware')


mangaRouter.post('/', checkMiddleware('ADMIN'), mangaController.create)
mangaRouter.post('/destroy', checkMiddleware('ADMIN'), mangaController.destroy)
mangaRouter.get('/', mangaController.getAll)
mangaRouter.get('/:id', mangaController.getOne)

module.exports = mangaRouter