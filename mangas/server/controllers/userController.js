const { User, Favorites } = require("../models/models")
const { v4 } = require('uuid')
const jwt = require('jsonwebtoken')
const path = require('path')
const bcrypt = require('bcrypt') // стойкий к перебору алгоритм
const ApiError = require("../error/ApiError")
const fs = require('fs')

// функция создания токена
async function createToken (id, name, email, role) {
    return jwt.sign(
        {
            id,
            name,
            email,
            role
        },
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userController {
    async registration(req, res, next) {
        try {
            const { name, email, password } = req.body
            const role = req.body.role || 'user'
            if (!name || !email || !password) throw new Error('Нужно заполнить все поля')
            // проверка на уже сущ пользователя
            const exist = await User.findOne({where: {email}})
            if (exist) throw new Error('Пользователь с таким email уже существует')
            // хеширование пароля
            const hashPassword = await bcrypt.hash(password, 5)
            // создание пользователя
            const user = await User.create({name, email, password: hashPassword, role})

            const token = await createToken(user.id, name, email, user.role)
            res.json(token)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async login(req, res, next) {
        try {
            // получение данных
            const { email, password } = req.body
            if (!email || !password) throw new Error('Нужно заполнить все поля')
            // идентификация
            const user = await User.findOne({where: {email}})
            if (!user) throw new Error('Пользователя с таким email не существует')
            // проверка пароля на валидность
            const valid = bcrypt.compareSync(password, user.password)
            if (!valid) throw new Error('Неверный пароль')
            // создание токена
            const token = await createToken(user.id, user.name, user.email, user.role)

            res.json(token)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async check(req, res, next) {
        const token = await createToken(req.user.id, req.user.name, req.user.email, req.user.role)
        res.json(token)
    }

    async findOne(req, res, next) {
        try {
            const { id } = req.query
            if (!id) throw new Error('не указан id пользователя')
            
            const user = await User.findOne({where: {id}})
            if (!user) throw new Error('пользователя с таким id нет в системе')

            res.json(user)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async changePhoto(req, res, next) {
        try {
            const { photo } = req.files
            const { id } = req.body
            if (!id) throw new Error('не указан id пользователя')
            // проверка на существование пользователя
            const n = await User.findOne({where: {id}})
            if (!n) throw new Error('пользователя с таким id нет в системе')
            // а также фото у него
            if (n.photo !== 'none') {
                fs.rmSync(
                    path.join(__dirname, '..', 'static', n.photo),
                    {recursive: true, force: true},
                    (err) => console.log(err)
                )
            }
            // создание имени
            const photoName = v4() + '.jpg'
            // перемещение фото
            photo.mv(path.join(__dirname, '..', 'static', photoName))
            // обновление таблицы юзера
            await User.update({photo: photoName}, {where: {id}})
            const user = await User.findOne({where: { id }})
            res.json(user)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new userController()
