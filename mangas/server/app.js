require('dotenv').config()
const PORT = process.env.PORT || 5001

const express = require('express')
const app = express()
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/router')
const fileUpload = require('express-fileupload')
const ErrorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(express.static('static'))

app.use('/api', router)

app.use(ErrorHandlingMiddleware)


async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error.message);
    }
}

start()
