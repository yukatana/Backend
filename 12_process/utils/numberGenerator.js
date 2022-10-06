const numberGenerator = (qty) => {
    const numbers = {}
    for (let i = 0; i < qty; i++) {
        let result = Math.ceil(Math.random() * 1000)
        if (!numbers[result]) {
            numbers[result] = 1
        } else {
            numbers[result]++
        }
    }
    return numbers
}

process.on('message', (qty) => {
    const result = numberGenerator(qty)
    process.send(result)
})

module.exports = numberGenerator