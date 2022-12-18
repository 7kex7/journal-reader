const express = require('express')
const chapterRouter = express()
const chapterController = require('../controllers/chapterController')

chapterRouter.post('/', chapterController.create)
chapterRouter.post('/destroy', chapterController.destroy)
chapterRouter.get('/', chapterController.getAll)
chapterRouter.get('/:id', chapterController.getOne)

module.exports = chapterRouter