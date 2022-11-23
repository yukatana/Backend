const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/auth/login')
    }
}

module.exports = checkAuthentication