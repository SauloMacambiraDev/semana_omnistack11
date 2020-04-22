const jwt = require('jsonwebtoken')

module.exports = id => {
    return jwt.sign(
        { id }, //payload
        process.env.JWT_SECRET, // Secret Key responsible for make token secure on signment step
        {
            expiresIn: process.env.JWT_EXPIRES_IN // expiresIn option will add some data to payload
        }
    )
}