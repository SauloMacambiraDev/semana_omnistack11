const knex = require('knex')
const configuration = require('./../../knexfile')

let setupDb = configuration.development;

if (process.env.NODE_ENV === 'test') setupDb = configuration.test;
if (process.env.NODE_ENV === 'production') setupDb = configuration.production;

const dbConnection = knex(setupDb)

module.exports = dbConnection

