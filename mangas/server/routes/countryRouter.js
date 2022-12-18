const express = require('express')
const countryRouter = express()
const countryController = require('../controllers/countryController')
const checkMiddleware = require('../middleware/checkMiddleware')

countryRouter.post('/', checkMiddleware('ADMIN'),  countryController.create)
countryRouter.post('/destroy', checkMiddleware('ADMIN'),  countryController.destroy)
countryRouter.get('/', countryController.getAll)
countryRouter.get('/:id', countryController.getOne)

module.exports = countryRouter