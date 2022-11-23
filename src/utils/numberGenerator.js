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

module.exports = numberGenerator