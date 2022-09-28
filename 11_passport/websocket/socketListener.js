const events = require("./socketEvents")

// Container imports for data persistence in mongoDB
const ProductContainer = require('../utils/mongoDBProductsContainer')
const MessageContainer = require('../utils/mongoDBMessagesContainer')

// Importing mongoose schemas and container instantiation
const Product = require('../db/mongoDB/schemas/product')
const Message = require('../db/mongoDB/schemas/message')
const {Server: SocketServer} = require("socket.io");
const productContainer = new ProductContainer(Product)
const messageContainer = new MessageContainer(Message)

module.exports = socketListener = (httpServer) => {
    const socketServer = new SocketServer(httpServer)

    socketServer.on('connection',  async (socket) => {
        console.log('A new client has connected')

        let products = await productContainer.getAll()
        socketServer.emit(events.PRODUCTS_INIT, products)

        let normalizedMessages = await messageContainer.getAll()
        socketServer.emit(events.MSGS_INIT, normalizedMessages)

        socket.on(events.POST_PRODUCT, async (product) => {
            console.log(product)
            await productContainer.save(product)
            socketServer.sockets.emit(events.NEW_PRODUCT, product)
        })

        socket.on(events.POST_MESSAGE, async (msg) => {
            console.log(msg)
            await messageContainer.save(msg)
            socketServer.sockets.emit(events.NEW_MESSAGE, msg)
        })
    } )
}