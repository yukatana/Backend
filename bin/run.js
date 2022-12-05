const { MODE } = require('../src/config')
const cluster = require('cluster')
const { cpus } = require('os')
const config = require('../src/config')
const app = require('../src/app')
const { Server } = require('http')
const http = new Server(app)

// Database connections
require('../src/db')()

// Initializing modular websocket listener with http server as argument
require('../src/websocket/socketListener')(http)

if (MODE === 'cluster' && cluster.isPrimary) {
    console.log(`Started master process with PID: ${process.pid}`)
    //Forking a worker for each core
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log(`Worker PID: ${worker.process.pid} has died. Spawning new worker...`)
        cluster.fork()
    })
} else {
    //Runs express server for every worker that is spawned or just once if we're running on fork mode
    const PORT = config.PORT

    http.listen(PORT, () => {
        console.log(`HTTP server listening on port ${PORT} - PID: ${process.pid}`)
    })

    http.on('error', error => console.log(`HTTP server error: ${error}`))
}