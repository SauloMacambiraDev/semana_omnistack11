const crypto = require('crypto');
const dbConnection = require('./../database/connection');
const generateUniqueId = require('./../utils/generateUniqueId')
const generateToken = require('./../utils/generateToken')
const createSendToken = require('./../utils/createSendToken')
const bcrypt = require('bcryptjs')

exports.index = async (req, res) => {

    try {

        const ongs = await dbConnection('ongs').select('*')

        return res.status(200).json({
            status: 'success',
            data: {
                ongs
            }
        })
    } catch (err) {
        return res.status(500).json({
            status: 'failure',
            message: err.message
        })
    }

}

exports.create = async (req, res) => {

    try {
        let { name, email, whatsapp, password, confirmPassword, city, uf } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'failure',
                message: 'Your confirm password is different from password.'
             })
        }

        const id = generateUniqueId()
        console.log(id)

        // Encrypt password with BCRYPT
        password = await bcrypt.hash(password, 12)

        const ong = await dbConnection('ongs').insert({
            id,
            name,
            email,
            password,
            whatsapp,
            city,
            uf
        })

        createSendToken(ong, 201, res)

    } catch (err) {
        return res.status(500).json({
            status: 'failure',
            message: `Wasn't possible to create ONG. ${err.message}`
        })
    }
}

exports.show = (req, res) => {

}
exports.update = (req, res) => {

}
exports.destroy = (req, res) => {

}
