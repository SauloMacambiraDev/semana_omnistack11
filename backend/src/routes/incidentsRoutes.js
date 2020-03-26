const express = require('express')
const incidentRouter = express.Router()
// const incidentRouter = express.Router({ mergeParams: true })

const incidentsController = require('./../controllers/incidentsController')


incidentRouter
.route('/listByOng')
.get(incidentsController.listByOng)

incidentRouter
.route('/')
.post(incidentsController.create)
.get(incidentsController.index)

incidentRouter
.route('/:id')
.delete(incidentsController.destroy)
.get(incidentsController.show)



module.exports = incidentRouter