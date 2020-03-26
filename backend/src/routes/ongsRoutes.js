const express = require('express')
const ongsRouter = express.Router()
const ongsController = require('./../controllers/ongsController')
const sessionController = require('./../controllers/sessionController')

// const incidentsRouter = require('./incidentsRouter')

// Auth Routes

ongsRouter.post('/session', sessionController.create)

// CRUD Routes
ongsRouter
.route('/')
.post(ongsController.create)
.get(ongsController.index)

ongsRouter
.route('/:id')
.get(ongsController.show)
// .put(ongsController.update)
// .delete(ongsController.destroy)

// ongsRouter.use('/:ongId/incidents', incidentsRouter)

module.exports = ongsRouter