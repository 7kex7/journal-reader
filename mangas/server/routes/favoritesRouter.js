const express = require('express')
const favoritesRouter = express()
const favoritesController = require('../controllers/favoritesController')

favoritesRouter.post('/', favoritesController.create)
favoritesRouter.post('/destroy', favoritesController.destroy)
favoritesRouter.get('/', favoritesController.getAll)
favoritesRouter.get('/one', favoritesController.getOne)

module.exports = favoritesRouter