
const numbersObj = {}

for (let index = 0; index < 10000; index++) {
    const random = Math.round((Math.random() * 19) + 1)

    if (numbersObj[random] === undefined) {
        numbersObj[random] = 1
    } else {
        numbersObj[random]++
    }
}

console.log({ numbersObj })