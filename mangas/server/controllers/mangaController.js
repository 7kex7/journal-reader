const { Manga, Chapter, Genre, Rating, Favorite } = require('../models/models')
const path = require('path')
const fs = require('fs')
const ApiError = require('../error/ApiError')

class mangaController {
    async create(req, res, next) {
        try {
            // получение данных
            const {name, status, yearId, startedyear, countryId, description} = req.body
            const nextChapter = req.body.nextChapter || 1
            let genres = req.body.genres

            // создание имени для папки манги
            const folderName = name.replace(/\s/g, '_')
            // создание папки манги
            if (!name || !yearId || !countryId || !startedyear) throw new Error('нужно заполнить все обязательные поля')

            fs.mkdir(path.join(__dirname, '..', 'static', folderName), {}, (err) => console.log(err))

            // получение изображения обложки
            const { coverImg } = req.files
            let coverImgName = 'cover.jpg'
            // отправка изображения обложки в папку соотв манги
            coverImg.mv(path.join(__dirname, '..', 'static', folderName, coverImgName))
            
            // создание манги
            const manga = await Manga.create({
                name,
                status,
                yearId,
                countryId,
                coverImg: coverImgName,
                genre: genres,
                nextChapter,
                startedyear,
                description
            })

            if (genres && genres.length) {
            if (genres) {
                genres = JSON.parse(genres)
                for (let i = 0; i < genres.length; i++) {
                    Genre.create({name: genres[i].name, mangaId: manga.id})
                }}
            }

            res.json(manga)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        const {countryId, yearId} = req.query
        // пагинация
        const page = req.query.page || 1
        const limit = req.query.limit || 9
        const offset = limit * (page - 1)
        let manga;
        if (!countryId && !yearId) {
            manga = await Manga.findAndCountAll({limit, offset})
        }
        if (countryId && !yearId) {
            manga = await Manga.findAndCountAll({where: {countryId}, limit, offset})
        }
        if (!countryId && yearId) {
            manga = await Manga.findAndCountAll({where: {yearId}, limit, offset})
        }
        if (countryId && yearId) {
            manga = await Manga.findAndCountAll({where: {countryId, yearId}, limit, offset})
        }
        res.json(manga)
    }

    async getOne(req, res, next) {
         try {
             const id = req.params.id
             const manga = await Manga.findOne({
                where: {id},
                include: [{model: Genre, as: 'genres'}]
            })
             if (!manga) throw new Error('не найдено')
             
             res.json(manga)
         } catch (error) {
            next(ApiError.badRequest(error.message))
         }
    }

    async destroy(req, res, next) {
        try {
            const id = req.body.id
            const manga = await Manga.findOne({where: {id}})
            if (!manga) throw new Error('манги с таким id не существует')
            // удаление папки
            const fname = manga.name.replace(/\s/g, '_')
            
            // удаление манги
            fs.rmSync(path.join(__dirname, '..', 'static', fname), { recursive: true, force: true }, (err) => console.log(err))
            await Manga.destroy({where: {id}})
            // Удаление глав и оценок для этой манги
            await Chapter.destroy({where: {mangaId: id}})
            await Rating.destroy({where: {mangaId: id}})
            await Favorite.destroy({where: {mangaId: id}})

            res.json({message: 'deleted successfully'})

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new mangaController()