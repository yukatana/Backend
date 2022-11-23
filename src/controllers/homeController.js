const serveHomepage = (req, res) => {
    res.render('root.hbs', {user: req.session.user})
}

module.exports = {
    serveHomepage
}