const request = require('supertest') //axios is not a good library for request test purpose
const app = require('./../../src/app')
const connection = require('./../../src/database/connection')


describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.latest(); // samething as npx knex migrate:latest on terminal
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Teste",
                email: "contato@apad.com.br",
                whatsapp: "4700000000",
                city: "Rio do Sul",
                uf: "SC"
            })

        console.log(response.body)
        // expect(response.body).toHaveProperty('id')
        // expect(response.body.id).toHaveLength(8)
    })
})