const { Router } = require("express")
const fs = require ("fs")

const Container = require("../utils/container")
const file = "database.json"
const container = new Container(file)

const APIrouter = new Router()

APIrouter.get("/", async (req, res) => {
    const data = await container.getAll()
    res.json(data)
})

APIrouter.get("/:id", async (req, res) => {
    const product = await container.getById(req.params.id)

    if (!product) {
        res.json({error: "product not found"})
    } else {
        res.json(product)
    }
    
})

APIrouter.post("/", async (req, res) => {
    res.json(await container.save({
        name: req.body.name,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }))
})

APIrouter.put("/:id", async (req, res) => {
    const data = await container.getAll()
    const isValid = data.findIndex(el => el.id == req.params.id)

    if (isValid != -1) {
        data[isValid].name = req.body.name
        data[isValid].price = req.body.price
        data[isValid].thumbnail = req.body.thumbnail
        await fs.promises.writeFile(file, JSON.stringify(data, null, 2))
    } else {
        res.json({error: "product not found"})
    }
})

APIrouter.delete("/:id", async (req, res) => {
    const success = await container.deleteById(req.params.id)
})

module.exports = APIrouter