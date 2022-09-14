const express = require('express')
const app = express()

// Container imports for data persistence in files
const Container = require('./utils/container')
const productsFile = 'database.json'
const productsContainer = new Container(productsFile)
const messagesFile = 'messagesFile.json'
const messagesContainer = new Container(messagesFile)

const {Server: SocketServer} = require('socket.io')
const {Server: HTTPServer} = require('http')

const httpServer = new HTTPServer(app)
const socketServer = new SocketServer(httpServer)
const events = require('./socketEvents')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

socketServer.on('connection', async (socket) => {
    console.log('A new client has connected')

    let products = await productsContainer.getAll()
    socketServer.emit(events.PRODUCTS_INIT, products)

    let messages = await messagesContainer.getAll()
    socketServer.emit(events.MSGS_INIT, messages)

    socket.on(events.POST_PRODUCT, async (product) => {
        await productsContainer.save(product)
        socketServer.sockets.emit(events.NEW_PRODUCT, product)
    })

    socket.on(events.POST_MESSAGE, async (msg) => {
        await messagesContainer.save(msg)
        socketServer.sockets.emit(events.NEW_MESSAGE, msg)
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const PORT = 8080
httpServer.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`)
})

httpServer.on('error', error => console.log(`Server error: ${error}`))