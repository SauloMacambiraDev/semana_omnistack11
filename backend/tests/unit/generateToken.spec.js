const generateToken = require('./../../src/utils/generateToken')

describe('Generate a Json Web Token', () => {
    it('Should generate JSON WEB TOKEN', () => {
        expect(generateToken())
        //.toHaveLength(8);
    })
})

