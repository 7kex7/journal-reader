const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') next()
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) throw new Error('не авторизован')
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) throw new Error('У пользователя недостаточно прав.')
            req.user = decoded
            next()
        } catch (error) {
            res.json({message: error.message})
        }
    }
}