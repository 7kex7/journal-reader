const { Rating, Manga } = require("../models/models")
const ApiError = require("../error/ApiError")

class ratingController {
    async create(req, res, next) {
        try {
            const {userId, mangaId, rate} = req.body
            
            if (!userId || !mangaId || !rate) throw new Error('не указано: userId ИЛИ mangaId ИЛИ rate')
            if (isNaN(rate) || isNaN(mangaId) || isNaN(userId)) throw new Error('userId ИЛИ mangaId ИЛИ rate должны являться числами')


            const mangaExists = await Manga.findOne({where: {id: Number(mangaId)}})
            if (!mangaExists) throw new Error('манги с таким id не существует')

            await Rating.destroy({where: {userId, mangaId}})

            const rating = await Rating.create({userId, mangaId, rate: Number(rate)})

            res.json(rating)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async change(req, res, next) {
        try {
            const {rate, userId, mangaId} = req.body
            await Rating.update({rate}, {where: {userId, mangaId}})

            const ratings = await Rating.findAll({where: {mangaId}})
            res.json(ratings)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    
    async getAll(req, res, next) {
        try {
            const mangaId = req.query.mangaId
            if (!mangaId) throw new Error('не указан id манги')
            const genres = await Rating.findAll({where: {mangaId}})

            res.json(genres)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

}

module.exports = new ratingController()
