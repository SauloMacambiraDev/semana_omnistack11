class AppError extends Error{
    constructor(message, statusCode){
        super(message); // message is the only parameter accepted by Error Class in its constructor
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith('4') ? 'failure' : 'error';
        this.isOperationalError = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;