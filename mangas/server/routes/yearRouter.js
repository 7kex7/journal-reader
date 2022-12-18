const express = require('express')
const yearRouter = express()
const yearController = require('../controllers/yearController')
const checkMiddleware = require('../middleware/checkMiddleware')

yearRouter.post('/', checkMiddleware('ADMIN'),  yearController.create)
yearRouter.post('/destroy', checkMiddleware('ADMIN'),  yearController.destroy)
yearRouter.get('/', yearController.getAll)
yearRouter.get('/:id', yearController.getOne)

module.exports = yearRouter