const { logger } = require('../../../logs')

const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        logger.info(`Unauthorized ${req.method} request for route ${req.path}`)
        res.redirect('/auth/login')
    }
}

module.exports = checkAuthentication