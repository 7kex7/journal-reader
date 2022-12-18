const { Country } = require("../models/models")

class countryController {
    async create(req, res, next) {
        const {name} = req.body
        const country = await Country.create({name})
        res.json(country)
    }

    async getAll(req, res, next) {
        const countries = await Country.findAll()
        res.json(countries)
    }

    async getOne(req, res, next) {
        const id = req.params.id
        const country = await Country.findOne({where: {id}})
        res.json(country)
    }

    async destroy(req, res, next) {
        const id = req.body.id
        await Country.destroy({where: {id}})
        const countries = await Country.findAll()
        res.json(countries)
    }
}

module.exports = new countryController()

