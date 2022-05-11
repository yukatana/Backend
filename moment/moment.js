const moment = require("moment")

const now = moment()
const birthday = moment("02/12/1997", "DD/MM/YYYY")

console.log(`Today is ${now.format("MM/DD/YYYY")}.`)
console.log(`I was born ${birthday.format("MM/DD/YYYY")}.`)
console.log(`It has been ${now.diff(birthday, "years")} years since I was born.`)
console.log(`It has been ${now.diff(birthday, "days")} days since I was born.`)