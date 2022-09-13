const faker = require('faker')

const generateProducts = (quantity) => {
    const testProducts = []
    for (let i = 0 ; i < quantity; i++) {
        testProducts.push({
            name: faker.commerce.product(),
            price: faker.commerce.price(0, 10000, 0, '$'),
            picture: faker.image.food()
        })
    }
    return testProducts
}

module.exports = generateProducts