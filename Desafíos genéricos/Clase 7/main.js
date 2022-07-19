const express = require("express")
const res = require("express/lib/response")

const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`HTTP server listening on port ${PORT}`)
})

const sentence = "Hello world what's up"

app.get("/api/sentence", (req, res) => {
    console.log("Request received.")

    return res.json({ sentence })
})

app.get("/api/letters/:num", (req, res) => {
    console.log("Request received.")

    const letter = sentence.charAt(req.params.num)

    if (!letter) {
        return res.json("No such letter exists.")
    }

    return res.json({ letter })
})

app.get("/api/words/:num", (req, res) => {
    console.log("Request received.")

    const wordArray = sentence.split(" ")
    const word = wordArray[req.params.num]

    if (!word) {
        return res.json({ error: "No such word exists." })
    }

    return res.json({ word })
})

app.get("/api/sumar/:num1/:num2", (req, res) => {
    console.log("Request received.")

    const result = Number(req.params.num1) + Number(req.params.num2)
    return res.json({ result })
})

app.get("/api/sumar", (req, res) => {
    console.log("Request received.")

    const result = Number(req.query.num1) + Number(req.query.num2)
    return res.json({ result })
})

app.get("/api/operacion/:op", (req, res) => {
    console.log("Request received.")

    const operacion = req.params.op

    const arrayNumeros = operacion.split("+")
    const num1 = arrayNumeros[0]
    const num2 = arrayNumeros[1]

    const result = Number(num1) + Number(num2)
    return res.json({ result })
})

//since it's repetitive it can be defined and called as a variable

app.post("/api", () => {
    return res.send(`OK ${req.method}`)
})

app.put("/api", () => {
    return res.send(`OK ${req.method}`)
})

app.delete("/api", () => {
    return res.send(`OK ${req.method}`)
})

server.on("error", error => console.log(`Server error: ${error}`))