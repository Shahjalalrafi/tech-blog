const express = require('express')
const morgan = require('morgan')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const middleWare = [
    morgan('dev'),
    express.urlencoded({extended: true}),
    express.static('public'),
    express.json()
]

app.use(middleWare)

app.get('/', (req, res) => {
    res.render('pages/auth/signup')
    // res.json({
    //     message:'hello everyOne'
    // })
})


const port = 5000
app.listen(port, () => {
    console.log(`listenning from port ${port}`)
})