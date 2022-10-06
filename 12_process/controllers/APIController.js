const numberGenerator = require('../utils/numberGenerator')
const { fork } = require('child_process')

const generateRandoms = (req, res) => {
    const child = fork('../utils/numberGenerator')
    child.send(req.query.qty || 10e8)
    child.on('message', result => {
        return res.send(result)
    })
    //const result = numberGenerator()
    //return res.send(result)
}

module.exports = {
    generateRandoms
}