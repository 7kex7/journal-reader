const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "user"},
    photo: {type: DataTypes.STRING, defaultValue: 'none'}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER},
})


const Manga = sequelize.define('manga', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    coverImg: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, unique: true},
    status: {type: DataTypes.STRING, defaultValue: '-'},
    description: {type: DataTypes.TEXT, defaultValue: ''},
    nextChapter: {type: DataTypes.INTEGER, defaultValue: 1},
    startedyear: {type: DataTypes.STRING}
})

const Chapter = sequelize.define('chapter', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    size: {type: DataTypes.INTEGER},
    numberch: {type: DataTypes.INTEGER, allowNull: false},
    manganame: {type: DataTypes.STRING},
})

const Country = sequelize.define('country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Year = sequelize.define('year', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.INTEGER}
})

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Favorite = sequelize.define('favorite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

// избранное
User.hasOne(Favorite)
Favorite.belongsTo(User)

Manga.hasOne(Favorite)
Favorite.belongsTo(Manga)

// глава
Manga.hasMany(Chapter)
Chapter.belongsTo(Manga)

// жанр
Manga.hasMany(Genre, {as: 'genres'})
Genre.belongsTo(Manga)

// год
Year.hasMany(Manga)
Manga.belongsTo(Year)

// страна
Country.hasMany(Manga)
Manga.belongsTo(Country)

// рейтинг
Manga.hasMany(Rating)
Rating.belongsTo(Manga)

User.hasMany(Rating)
Rating.belongsTo(User)

module.exports = {
    User,
    Year,
    Manga,
    Genre,
    Rating,
    Chapter,
    Country,
    Favorite,
}
