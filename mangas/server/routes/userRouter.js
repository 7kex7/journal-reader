const express = require('express')
const userRouter = express()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.post('/changephoto', userController.changePhoto)
userRouter.get('/findOne', userController.findOne)
userRouter.get('/check', authMiddleware, userController.check)

module.exports = userRouter