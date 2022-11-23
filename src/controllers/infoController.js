const serveProcessInfo = (req, res) => {
    const processInfo = {
        args: process.argv.splice(2),
        path: process.cwd(),
        operatingSystem: process.platform,
        processId: process.pid,
        title: process.title,
        nodeVersion: process.version,
        folder: __dirname,
        memory: `${process.memoryUsage().rss/1e6} MB`
    }
    res.render('info.hbs', processInfo)
}

module.exports = {
    serveProcessInfo
}