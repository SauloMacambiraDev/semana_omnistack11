const catchAsync = require('./../utils/catchAsync')

const sendErrorProd = (err,res) => {
    if (err.isOperationalError){
        // in case this closure is executed, it means that the error were handled, so it is an Operational Error

        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        // otherwise, it is a Application Error.

        // Sending generic message
        return res.status(500).json({ 
            status: 'error',
            message: 'Internal error server'
        })
    }
}

const sendErrorDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        errorObject: err,
        message: err.message,
        stack: err.stack
    })
}

module.exports = (err, req,res,next) => {
    // if (process.env.NODE_ENV === 'development') console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV.trim() === 'production'){
        let error = Object.create(err); // {...err} Spread Operator doesn't take deep level properties from Error Js Class
        
        //Treat errors sent from database by its ORM(query builder) technology

        sendErrorProd(error, res);
    } else {
        sendErrorDev(err, res);
    }

}