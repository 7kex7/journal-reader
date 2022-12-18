const { Favorite, Manga } = require("../models/models")
const ApiError = require('../error/ApiError')

class favoritesController {
    async create(req, res, next) {
        try {
            const {mangaId, userId} = req.body

            const manga = await Manga.findOne({where: {id: mangaId}})
            if (!manga) throw new Error('манги с таким id не существует')

            const favorite = await Favorite.create({mangaId, userId, name: manga.name})

            res.json(favorite)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.query
            if (!userId) throw new Error('не указан id пользователя')
            const favorites = await Favorite.findAll({where: {userId}})

            res.json(favorites)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {userId, mangaId} = req.query
            const favorite = await Favorite.findOne({where: {userId, mangaId}})
            if (!favorite) {
                return res.json({data: 'NO'})
            }
            else {
                return res.json({data: 'YES'})
            }
            
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async destroy(req, res, next) {
        try {
            const {mangaId, userId} = req.body
            await Favorite.destroy({where: {mangaId, userId}})
    
            res.json({message: "removed from favorites"})
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new favoritesController()
