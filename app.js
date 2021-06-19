// external exports
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);

// internal imports
const authRoute = require('./routes/authRoute')
const dashboardRoute = require('./routes/dashboardRoute')
// playgroundRoutes
const validatorRoutes = require('./playground/validator')

// import middleWare
const { bindUserWithRequest} = require('./middleware/authmiddleware')
const { setlocals } = require('./middleware/setlocals')

const MONGODB_URI = "mongodb+srv://myTodos:rafi1234@cluster0.fltsf.mongodb.net/techBlog?retryWrites=true&w=majority"
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
    setlocals()
]

app.use(middleWare)

app.use('/auth', authRoute)
app.use('/playground', validatorRoutes)
app.use('/dashboard', dashboardRoute)

app.get('/', (req, res) => {
    res.json({
        message: 'hello world'
    })
})


const port = 5000
app.listen(port, () => {
    console.log(`listenning from port ${port}`)
})