const express = require('express')
const router = express()

const chapterRouter = require('./chapterRouter')
const countryRouter = require('./countryRouter')
const userRouter = require('./userRouter')
const favoritesRouter = require('./favoritesRouter')
const mangaRouter = require('./mangaRouter')
const yearRouter = require('./yearRouter')
const ratingRouter = require('./ratingRouter')

router.use('/manga', mangaRouter)
router.use('/user', userRouter)
router.use('/favorite', favoritesRouter)
router.use('/country', countryRouter)
router.use('/chapter', chapterRouter)
router.use('/year', yearRouter)
router.use('/rating', ratingRouter)

module.exports = router

