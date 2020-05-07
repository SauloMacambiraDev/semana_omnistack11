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

        const ongExist = await dbConnection('ongs').where('email', email).select('*').first()
        if (ongExist) {
            return res.status(400).json({
                status: 'failure',
                message: `There is a ong with email ${email} already signed up. Please choose another email.`
            })
        }

        const id = generateUniqueId()


        // Encrypt password with BCRYPT
        password = await bcrypt.hash(password, 12)

        let ongObject = {
            id,
            name,
            email,
            password,
            whatsapp,
            city,
            uf
        };

        const ong = await dbConnection('ongs').insert(ongObject);

        createSendToken(ongObject, 201, res)

    } catch (err) {
        return res.status(500).json({
            status: 'failure',
            message: `Wasn't possible to create ONG. ${err.message}`
        })
    }
}

exports.show = async (req, res, next) => {
    const { id } = req.params

    const ong = await dbConnection('ongs').select('*').where('id', id).first()
    if (!ong) {
        return res.status(400).json({
            status: 'failure',
            message: 'No ong was found with such id'
        })
    }

    return res.status(200).json({
        status: 'success',
        data: {
            ong
        }
    })
}

exports.update = (req, res) => {

}
exports.destroy = (req, res) => {

}
