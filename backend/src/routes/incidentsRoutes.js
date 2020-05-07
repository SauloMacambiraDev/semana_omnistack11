const express = require('express')
const incidentRouter = express.Router()
// const incidentRouter = express.Router({ mergeParams: true })
const { celebrate, Segments, Joi } = require('celebrate')
const incidentsController = require('./../controllers/incidentsController')
const sessionController = require('./../controllers/sessionController')


// Adding middleware on router handlers bellow
// incidentRouter.use(celebrate({
//     [Segments.HEADERS]: Joi.object({
//         authorization: Joi.string().required()
//     }).unknown()
// }))

// incidentRouter.use(sessionController.protect)

incidentRouter
    .get('/listByOng/:id', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    }), incidentsController.listByOng)

incidentRouter
    .route('/')
    .post(
        sessionController.protect,
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().required(),
                description: Joi.string().required(),
                value: Joi.number().required()
            })
        }), incidentsController.create)
    .get(
        celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number()
            })
        }), incidentsController.index)

incidentRouter
    .route('/:id')
    .delete(celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), incidentsController.destroy)
    .get(incidentsController.show)



module.exports = incidentRouter