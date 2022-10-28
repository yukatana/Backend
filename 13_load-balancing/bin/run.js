const { MODE } = require('../src/config')
const cluster = require('cluster')
const { cpus } = require('os')
const app = require('../src/server')

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
    app
}