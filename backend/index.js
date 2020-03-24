const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/config.env` })

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'hello World'
    })
})


app.all('*', (req, res, next) => {

    return res.status(404).json({
        message: `No Route was found to ${req.host}${req.url}`
    })
})

const PORT = process.env.PORT || 8000

app.listen(3333, function () {
    console.log(`Server running on port ${PORT}`)
});