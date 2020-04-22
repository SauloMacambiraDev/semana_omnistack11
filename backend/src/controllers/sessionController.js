const dbConnection = require('./../database/connection');
const createSendToken = require('./../utils/createSendToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.create = async (req, res) => {
    const { id } = req.body

    

    const ong = await dbConnection('ongs')
                        .where('id',id)
                        .select('name')
                        .first()
    if (!ong) {
        return res.status(400).json({ error: 'No ONG found with this ID'})
    }

    return res.status(201).json({
        ong
    })
}

// Sign in using email and password approach
exports.signIn = async (req,res,next) => {
    try{
        const { email, password } = req.body

        if(!password || !email) {
            return res.status(400).json({ status: 'failure', message: 'Please, provide email and password to log in'})
        }

        const ong = await dbConnection('ongs')
                    .where('email', email)
                    .select('*')
                    .first()

        // Checking if Ong exist and if password is correct
        if(!ong || !(await bcrypt.compare(password, ong.password))){
            return res.status(401).json({ status: 'failure', message: 'Incorrect email or password'})
        }

        createSendToken(ong, 200, res)

    }catch(err){
        console.log(err)
        return res.status(401).json({
            status: 'error',
            message: 'For some reason, was not possible to login. Try again in a few minutes.'
        })
    }
}

module.exports.protect = async (req,res,next) => {
    try{
        const { authorization } = req.headers;

        let token;

        // 1) Does token exist?
        if (authorization && authorization.startsWith('Bearer')){
            token = authorization.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({ 
                status: 'failure', 
                message: `You're not logged in. Please sign in to access.`    
            })
        }

        // 2) Verification token
        const decodedPayload = await promisify(jwt.verify)(token, process.env.JWT_SECRET) // promisifying to avoid sync call inside an assync call

        // 3) Check if ong still exists in database
        const currentOng = await dbConnection('ongs').where('id', decodedPayload.id).select('*').first()
        if(!currentOng){
            return res.status(401).json({status: 'failure', message: 'Ong no longer exists in application'});
        }

        // 4) Check if the ONG changed password after the token was issued
        if (currentOng.passwordChangedAt){ 
            const passwordChangedAtTimestamp = parseInt(currentOng.passwordChangedAt.getTime() / 1000, 10) // From Date to Timestamp
            //iat = issued at
            if(passwordChangedAtTimestamp > decodedPayload.iat){
                return res.status(401).json({ 
                    status: 'failure', 
                    message: 'ONG has recently changed its password. Please log in again.'
                })
            }
        }
        
        req.ong = currentOng
        next();

    } catch(err){
        console.log(err)
        return res.status(500).json({
            status: 'failure',
            message: err.message
        })
    }
    
}