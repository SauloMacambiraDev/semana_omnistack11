const generateToken = require('./generateToken');

module.exports = (ong, statusCode, response) => {
    // Hide password on response
    ong.password = undefined;

    const token = generateToken(ong.id)

    const cookieOptions = {
        expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)), // convert to milliseconds
        httpOnly: true //cookie can't be accessed or modified by any way in the browser
    }

    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true //will only be sent with HTTPs connection

    response.cookie('jwt', token, cookieOptions)

    response.status(statusCode).json({
        status: 'success',
        token,
        ong
    })
}