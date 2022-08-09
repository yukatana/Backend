const express = require('express')
const app = express()

const Container = require('./utils/container')
const file = 'database.json'
const container = new Container(file)

const {Server: SocketServer} = require('socket.io')
const {Server: HTTPServer} = require('http')

const httpServer = new HTTPServer(app)
const socketServer = new SocketServer(httpServer)

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

socketServer.on('connection', async (socket) => {
    console.log('A new client has connected')
    let products = await container.getAll()
    socket.emit('productList', products)


})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post("/products", async (req, res) => {
    await container.save({
        name: req.body.name,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    })
    res.redirect('/')
})

const PORT = 8080
httpServer.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`)
})

httpServer.on('error', error => console.log(`Server error: ${error}`))