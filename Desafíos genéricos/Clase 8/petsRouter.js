const { Router } = require("express")

const pets = []

const petsRouter = Router()

petsRouter.get("", (req, res) => {
    return res.json(pets)
})

petsRouter.post("", (req, res) => {
    const pet = req.body

    pet.id = pets.length+1
    pets.push(pet)

    return res.status(201).json(pet)
})

module.exports = petsRouter