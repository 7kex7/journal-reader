const ApiError = require('../error/ApiError')
const { Chapter, Manga } = require('../models/models')
const path = require('path')
const fs = require('fs')


class chapterController {

    async create(req, res, next) {
        try {
            // получение данных
            const { name, mangaId } = req.body
            if (!name || !mangaId) throw new Error("не указано имя или id манги")

            // получение манги
            const manga = await Manga.findOne({where: {id: mangaId}})
            if (!manga) throw new Error('Манги с таким id не существует')
            const numberch = req.body.numberch || manga.nextChapter

            // получение имени папки манги
            const folderMangaName = manga.name.replace(/\s/g, '_')

            // получение страниц с клиента
            const { pages } = req.files
            if (!pages) throw new Error('нужно добавить картинки')
            
            if (isNaN(numberch)) throw new Error('номер главы должен быть числом')

            // создание папки в 'static': 'folderMangaName' => 'folderName'
            fs.mkdir(path.join(__dirname, '..', 'static', folderMangaName, numberch + ''), {}, (err) => console.log(err))

            let size = 1;
            // помещение страниц в папку
            if (!Array.isArray(pages)) {
                pages.mv(path.join(__dirname, '..', 'static', folderMangaName, numberch + '', '1.jpg'))
                size = 1
            } else {
                pages.forEach((page, index) => {
                    page.mv(path.join(__dirname, '..', 'static', folderMangaName, numberch + '', `${index + 1}.jpg`))
                    size = index + 1
                })
            }

            // обновление свойиства "nextChapter" в соотв манге
            const nextChapter = manga.nextChapter+1
            await Manga.update({nextChapter}, {where: {id: mangaId}})

            // создание главы
            const chapter = await Chapter.create({name, mangaId, numberch, size, manganame: manga.name})

            res.json(chapter)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    
    async getAll(req, res, next) {
        try {
            const {mangaId} = req.query
            if (!mangaId) throw new Error('не указан id')

            const chapters = await Chapter.findAll({where: {mangaId}})
            if (chapters.length === 0) return res.json({data: 'глав не найдено!'})

            res.json({data: chapters})

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id
            if (!id) throw new Error('не указан id главы.')

            const pages = await Chapter.findOne({where: {id}})
            if (pages === null) throw new Error('ничего не найдено!')

            res.json(pages)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }


    async destroy(req, res, next) {
        try {
            // получение данных с клиента
            const id = req.body.id
            if (!id) throw new Error('не указан id')
            
            // получение имени манги, чтобы удалить папку
            const chapter = await Chapter.findOne({where: {id: Number(id)}})
            const mangaId = Number(chapter.mangaId)
            const manga = await Manga.findOne({where: {id: mangaId}})
            const fname = manga.name.replace(/\s/g, '_')
            fs.rmSync(path.join(__dirname, '..', 'static', fname, chapter.numberch + ''), { recursive: true, force: true });
            
            // удаление соотв главы
            await Chapter.destroy({where: {id: Number(id)}})
           
            // обновление "nextChapter" в соотв манге
            const nextChapter = manga.nextChapter - 1
            await Manga.update({nextChapter}, {where: {id: mangaId}})

            const chapters = await Chapter.findAll()
            res.json(chapters)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new chapterController()
