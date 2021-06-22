const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
var MongoDBStore = require('connect-mongodb-session')(session);

const { bindUserWithRequest } = require('./authmiddleware')
const { setlocals } = require('./setlocals')

const MONGODB_URI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.fltsf.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
  })

const middleWare = [
    morgan('dev'),
    express.urlencoded({extended: true}),
    express.static('public'),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserWithRequest(),
    setlocals(),
    flash()
]

module.exports = app => {
    middleWare.forEach(m => {
        app.use(m)
    })
}