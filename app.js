const express = require('express')

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.json({
        message:'hello everyOne'
    })
})


app.listen(port, () => {
    console.log(`listenning from port ${port}`)
})