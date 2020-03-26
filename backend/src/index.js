const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/../config.env`})

const express = require('express')
const app = express()

// Importings Routes
const ongsRouter = require('./routes/ongsRoutes')
const incidentsRouter = require('./routes/incidentsRoutes')


// Middlewares
if(process.env.NODE_ENV === 'production'){
    app.use(cors({
        // origin: 'http://meuapp.com.br' // example of domain host to our application in production
    }))
} else {
    app.use(cors()) //allow all applications to access our NodeJs application
}

app.use(express.json())

// Routes
app.use('/api/v1/ongs', ongsRouter)
app.use('/api/v1/incidents', incidentsRouter)

app.all('*', (req, res, next) => {

    return res.status(404).json({
        message: `No Route was found to ${req.hostname}${req.url}`
    })
})


const PORT = process.env.PORT || 8000

app.listen(3333, function () {
    console.log(`Server running on port ${PORT}`)
});