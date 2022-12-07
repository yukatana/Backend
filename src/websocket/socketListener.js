// SocketServer and events import
const {Server: SocketServer} = require("socket.io")
const events = require("./socketEvents")

// Factory import and DAO fetching
const factory = require('../factories/DAOFactory')
const ProductDAO = factory.getProductDAO()
const MessageDAO = factory.getMessageDAO()

// Repository import for data processing
const MessageRepository = require('../repositories/messageRepository')

module.exports = socketListener = (httpServer) => {
    const socketServer = new SocketServer(httpServer)

    socketServer.on('connection',  async (socket) => {
        console.log('A new client has connected')

        let products = await ProductDAO.getAll()
        socketServer.emit(events.PRODUCTS_INIT, products)

        let normalizedMessages = await MessageDAO.getAll()
        let processedNormalizedMessages = MessageRepository.processAllMessages(normalizedMessages)
        socketServer.emit(events.MSGS_INIT, processedNormalizedMessages)

        socket.on(events.POST_PRODUCT, async (product) => {
            console.log(product)
            await ProductDAO.save(product)
            socketServer.sockets.emit(events.NEW_PRODUCT, product)
        })

        socket.on(events.POST_MESSAGE, async (msg) => {
            console.log(msg)
            await MessageDAO.save(msg)
            socketServer.sockets.emit(events.NEW_MESSAGE, msg)
        })
    } )
}