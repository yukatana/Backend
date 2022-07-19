const express = require("express")
const peopleRouter = require("./peopleRouter")
const petsRouter = require("./petsRouter")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", express.static(__dirname + "/public"))

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`HTTP server listening on port ${PORT}`)
})

app.use("/people", peopleRouter)
app.use("/pets", petsRouter)

server.on("error", error => console.log(`Server error: ${error}`))