const { Year } = require("../models/models")
const ApiError = require('../error/ApiError')

class yearController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            if (!name) throw new Error('Не указано имя')
            const year = await Year.create({name})

            res.json(year)
        } catch (error) {
            next(ApiError.badRequest(error.message))            
        }
    }

    async getAll(req, res, next) {
        const years = await Year.findAll()
        res.json(years)
    }

    async getOne(req, res, next) {
        const id = req.params.id
        const year = await Year.findOne({where: {id}})
        res.json(year)
    }

    async destroy(req, res, next) {
        try {
            const id = req.body.id
            await Year.destroy({where: {id: Number(id)}})
            const years = await Year.findAll()

            res.json(years)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new yearController()

