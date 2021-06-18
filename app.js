const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const authRoute = require('./routes/authRoute')
// playgroundRoutes
const validatorRoutes = require('./playground/validator')

const app = express()

let uri = "mongodb+srv://myTodos:rafi1234@cluster0.fltsf.mongodb.net/techBlog?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
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
    express.json()
]

app.use(middleWare)

app.use('/auth', authRoute)
app.use('/playground', validatorRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'hello world'
    })
})


const port = 5000
app.listen(port, () => {
    console.log(`listenning from port ${port}`)
})