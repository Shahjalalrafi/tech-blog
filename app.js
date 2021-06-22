// external exports
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('config')

// internal imports
const setRoute = require('./routes/routes')
const setMiddleWare = require('./middleware/middleware')


const MONGODB_URI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.fltsf.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`
// mongodb session


const app = express()


// mongoose connecet
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connected')
    })
    .catch(err => {
        console.log(err)
    })


app.set('view engine', 'ejs')
app.set('views', 'views')

if(app.get('env').toLowerCase() === 'development') {
    app.use(morgan('dev'))
}

const dbConfig = config.get('name')
console.log(dbConfig)


// using middleware from middleware directory
setMiddleWare(app)

// user routes from routes directory
setRoute(app)

app.use((req, res, next) => {
    let error = new Error('404 page not found!')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) =>{
    if(error.status ===  404) {
        return res.render('pages/error/404', {
            flashMessage: {}
        })
    }

    return res.render('pages/error/505', {
        flashMessage: {}
    })
})

const port = 5000
app.listen(port, () => {
    console.log(`listenning from port ${port}`)
})