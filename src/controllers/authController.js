const serveLogin = (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
}

const postLogin = (req, res) => {
    req.session.user = req.user.username
    res.redirect('/')
}

const getLoginError = (req, res) => {
    res.sendFile(__dirname + '/public/loginError.html')
}

const serveSignup = (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
}

const trySignup = (req, res) => {
    req.session.user = req.user.username
    res.redirect('/')
}

const serveSignupError = (req, res) => {
    res.sendFile(__dirname + '/public/signupError.html')
}

const tryLogout = (req, res) => {
    req.session.destroy()
    req.logout(() => res.redirect('/logout'))
}

const serveLogout = (req, res) => {
    res.sendFile(__dirname + '/public/logout.html')
}

module.exports = {
    serveLogin,
    postLogin,
    getLoginError,
    serveSignup,
    trySignup,
    serveSignupError,
    tryLogout,
    serveLogout
}