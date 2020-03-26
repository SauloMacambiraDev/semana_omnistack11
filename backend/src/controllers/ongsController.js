const crypto = require('crypto');
const dbConnection = require('./../database/connection');


exports.index = async (req,res) => {

    try{

        const ongs = await dbConnection('ongs').select('*')

        return res.status(200).json({
            status: 'success',
            data:{ 
                ongs
            }
        })
    }catch(err){
        return res.status(500).json({ 
            status: 'failure',
            message: err.message
        })
    }

}

exports.create = async (req,res) => {

    try{
        const { name, email, whatsapp, city, uf } = req.body

        const id = crypto.randomBytes(12).toString('HEX')

        console.log(id)

        const ong = await dbConnection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.status(201).json({
            status: 'success',
            id
        })

    } catch(err){
        return res.status(500).json({ 
            status: 'failure',
            message: `Wasn't possible to create ONG. ${err.message}`
        })
    }
}

exports.show = (req,res) => {

}
exports.update = (req,res) => {

}
exports.destroy = (req,res) => {

}
