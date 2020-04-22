const express = require('express')
const ongsRouter = express.Router()
const ongsController = require('./../controllers/ongsController')
const sessionController = require('./../controllers/sessionController')
const { celebrate, Segments, Joi } = require('celebrate')

/***
 * Joi library validation for JS in general made by Rappi
 * Celebrate library use Joi lib behind the scenes and integrate with ExpressJs
 * 
 *  */


// const incidentsRouter = require('./incidentsRouter')

// Auth Routes

// Sign in with email & password
ongsRouter.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        // id: Joi.string().required()
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}), sessionController.signIn)

// CRUD Routes
ongsRouter
    .route('/')
    .post(celebrate({
        // Segments.BODY will not be processed because everytime we pass an variable as a key of an object we must use [] around
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required().min(3),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            password: Joi.string().required().min(6), 
            confirmPassword: Joi.string().required().min(6), 
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
        })
    }), ongsController.create)
    .get(sessionController.protect, ongsController.index)

ongsRouter
    .route('/:id')
    .get(ongsController.show)
    // .put(ongsController.update)
// .delete(ongsController.destroy)


module.exports = ongsRouter