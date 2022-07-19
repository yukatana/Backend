const { Router } = require("express")

const people = []

const peopleRouter = Router()

peopleRouter.get("", (req, res) => {
    return res.json(people)
})

peopleRouter.post("", (req, res) => {
    const person = req.body

    person.id = people.length+1
    people.push(person)

    return res.status(201).json(person)
})

module.exports = peopleRouter