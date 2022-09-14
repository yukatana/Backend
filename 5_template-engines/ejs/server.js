const express = require("express")
const app = express()
const PORT = 8080

//EJS import:
app.set('view engine', 'ejs')

//Container class import to be used by GET /products - use MemoryContainer for testing, or FileContainer for database interaction

const MemoryContainer = require("./utils/memory")
const NAME = "test database"
const container = new MemoryContainer(NAME)

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Express HTTP server running on port ${PORT}`)
})

app.get("/", (req, res) => {
    res.render("form")
})

app.get("/products", async (req, res) => {
    const data = await container.getAll()
    res.render("grid", {item: data, dataExists: data.length > 0 ? true : false})
})

app.post("/products", async (req, res) => {
    await container.save({
        name: req.body.name,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    })
    res.redirect("/products")
})

server.on("error", error => console.log(`Server error: ${error}`))