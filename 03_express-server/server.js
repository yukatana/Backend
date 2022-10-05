const Container = require("./class")
const fs = require("fs")

const express = require("express")
const app = express()
const PORT = 8080   //const and caps is good practice for server variables

const products = new Container("products.txt")

const server = app.listen(PORT, () => {
    console.log(`Express HTTP server running on port ${PORT}`)
})

app.get("/products", async (req, res) => {
    return res.json(await products.getAll())
})

app.get("/randomProduct", async (req, res) => {
    const list = await products.getAll()
    const index = Math.ceil(Math.random() * list.length)-1

    return res.json(list[index])
})

server.on("error", error => console.log(`Server error: ${error}`))