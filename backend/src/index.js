const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/../config.env`})

const express = require('express')
const app = express()

// Importings Routes
const ongsRouter = require('./routes/ongsRoutes')
const incidentsRouter = require('./routes/incidentsRoutes')

// Importing Utils
const requestInfo = require('./utils/requestInfo');
const AppError = require('./utils/appError')

//Importing Global Error Handler
const globalErrorHandler = require('./controllers/errorController')

// Middlewares

app.use(express.json())

if(process.env.NODE_ENV === 'production'){
    app.use(cors({
        // origin: 'http://meuapp.com.br' // example of domain host to our application in production
    }))
} else {
    app.use(cors()) //allow all applications to access our NodeJs application
    
    app.use((req,res,next) => {
        requestInfo(req);
    
        return next();
    });
}

// Routes
app.use('/api/v1/ongs', ongsRouter)
app.use('/api/v1/incidents', incidentsRouter)

app.all('*', (req, res, next) => {

    return next(new AppError(`No Route was found to ${req.hostname}${req.url}`, 404));
})

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000

app.listen(3333, function () {
    console.log(`Server running on port ${PORT}`)
});