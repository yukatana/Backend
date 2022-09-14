const faker = require('faker')

const generateProducts = (quantity) => {
    const testProducts = []
    for (let i = 0 ; i < quantity; i++) {
        testProducts.push({
            product_name: faker.commerce.product(),
            price: faker.commerce.price(0, 10000, 0, '$'),
            thumbnail: faker.image.nature(null, null, true)
        })
    }
    console.log(testProducts)
    return testProducts
}

module.exports = generateProducts