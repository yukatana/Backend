const productGenerator = require('../../utils/productGenerator')

const generateRandoms = (req, res) => {
    let testProducts = productGenerator(5)
    res.render('test.hbs', { products: testProducts })
}

module.exports = {
    generateRandoms
}