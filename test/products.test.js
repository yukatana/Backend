const expect = require('chai').expect
const supertest = require('supertest')
const agent = supertest.agent('http://localhost:8080')

describe('Products CRUD test', () => {
    it('Should log in with test credentials', async () => {
        const testCredentials = {
            username: 'test@gmail.com',
            password: 'test'
        }
        const response = await agent.post('/auth/login').send(testCredentials)
        expect(response.status).to.equal(302)
    })

    let testProductId // Stores ID from created product to put and delete
    it('Should add a product', async () => {
        const testProduct = {
            name: 'Candida albicans',
            price: 500,
            thumbnail: 'https://drfungus.org/wp-content/uploads/2017/02/candida.jpg'
        }
        const response = await agent.post('/api/products').send(testProduct)
        testProductId = response.body._id
        expect(response.body).to.contain(testProduct)
    })

    it('Should edit a product', async () => {
        const productUpdate = {price: 1000}
        const response = await agent.put(`/api/products/${testProductId}`).send(productUpdate)
        expect(response.body.price).to.equal(1000)
    })

    it('Should delete a product', async () => {
        const response = await agent.del(`/api/products/${testProductId}`)
        expect(response.status).to.equal(200)
    })
})