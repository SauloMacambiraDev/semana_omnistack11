const dbConnection = require('../database/connection');


exports.create = async (req, res) => {
    try {
        const { title, description, value } = req.body //id will be generated incrementally
        // const { authorization: ongId } = req.headers

        // const result = await dbConnection('incidents').insert({
        //     title,
        //     description,
        //     value,
        //     ong_id: ongId
        // })

        // const id = result[0]

        const [id] = await dbConnection('incidents').insert({
            title,
            description,
            value,
            ong_id: req.ong.id
        })

        return res.status(201).json({
            status: 'success',
            idIncident: id
        })
    } catch (err) {
        return res.status(500).json({
            status: 'failure',
            message: err.message
        })
    }
}

exports.index = async (req, res) => {
    try {
        const { page = 1 } = req.query

        const [totalIncidents] = await dbConnection('incidents')
            .count()

        const incidents = await dbConnection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])

        res.header('X-Total-Count', totalIncidents['count(*)'])

        return res.status(201).json({
            status: 'success',
            results: totalIncidents['count(*)'],
            incidents
        })

    } catch (err) {
        return res.status(500).json({
            status: 'failure',
            message: err.message
        })
    }
}

exports.show = async (req, res) => {
    try {
        // const { authorization: ongId } = req.headers

        const { id } = req.params

        const incident = await dbConnection('incidents')
            .where({
                id
            })
            .select('*')
            .first()
        if (!incident) {
            return res.status(404).json({
                status: 'failure',
                message: `No incident was found with id ${id}`
            })
        }

        if (incident.ong_id !== req.ong.id) {
            return res.status(401).json({
                status: 'failure',
                message: `You're not authorized to see this incident`
            })
        }

        return res.status(200).json({
            status: 'success',
            incident
        })
    } catch (err) {
        return res.status(500).json({
            status: 'failure',
            message: err.message
        })
    }
}

exports.destroy = async (req, res) => {
    try {

        const { id } = req.params

        // const { authorization: ongId } = req.headers

        const incident = await dbConnection('incidents')
            .where({
                id
            })
            .select('ong_id')
            .first()

        if (!incident) {
            return res.status(404).json({
                status: 'failure',
                message: 'No incident was found'
            })
        }

        if (incident.ong_id !== req.ong.id) {
            return res.status(401).json({
                status: 'failure',
                message: `You're not authorized to delete this incident`
            })
        }

        await dbConnection('incidents')
            .where({ id })
            .delete()

        return res.status(204).json({
            status: 'success',
            data: null
        })

    } catch (err) {
        return res.status(500).json({
            status: 'failure',
            message: err.message
        })
    }
}

exports.listByOng = async (req, res) => {
    try {
        const { page = 1 } = req.query

        // const { ongId } = req.params
        // const { authorization: ongId } = req.headers
        

        const [totalIncidents] = await dbConnection('incidents')
            .where({ong_id: req.ong.id})
            .count()

        const incidents = await dbConnection('incidents')
            .where({ ong_id: req.ong.id })
            .limit(5)
            .offset((page - 1) * 5)
            .select('*')

        res.header('X-Total-Count', totalIncidents['count(*)'])

        return res.status(200).json({
            status: 'success',
            results: totalIncidents['count(*)'],
            incidents
        })
    } catch (err) {
        return res.status(500).json({
            status: 'failure',
            message: err.message
        })
    }
}