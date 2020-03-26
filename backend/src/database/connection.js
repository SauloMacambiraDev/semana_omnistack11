const knex = require('knex')
const configuration = require('./../../knexfile')

const dbConnection = knex(configuration.development)

module.exports = dbConnection

