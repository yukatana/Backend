const numberGenerator = require('../utils/numberGenerator')

const generateRandoms = (req, res) => {
    const result = numberGenerator(req.query.qty || 10e8)
    return res.send(result)
}

module.exports = {
    generateRandoms
}