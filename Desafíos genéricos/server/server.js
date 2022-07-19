const http = require("http")

const server = http.createServer((req, resp) => {
    
    const time = new Date().getHours()

    if (6 < time < 13) {
        message = "Buenos días!"
    } else if (13 < time < 19) {
        message = "Buenas tardes!"
    } else {
        message = "Buenas noches!!"
    }

    resp.end(message)
})//.listen(8080, () => 
//console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`))

//the above works because such methods can be joined

const connectedServer = server.listen(8080, () => 
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`))


