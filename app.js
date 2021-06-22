// external exports
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
var MongoDBStore = require('connect-mongodb-session')(session);

// internal imports
const authRoute = require('./routes/authRoute')
const dashboardRoute = require('./routes/dashboardRoute')
// playgroundRoutes
// const validatorRoutes = require('./playground/validator')

// import middleWare
const { bindUserWithRequest} = require('./middleware/authmiddleware')
const { setlocals } = require('./middleware/setlocals')

const MONGODB_URI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.fltsf.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`
// mongodb session
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
  })

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

const middleWare = [
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

app.use(middleWare)

app.use('/auth', authRoute)
app.use('/dashboard', dashboardRoute)
// app.use('/playground', validatorRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'hello world'
    })
})


const port = 5000
app.listen(port, () => {
    console.log(`listenning from port ${port}`)
})