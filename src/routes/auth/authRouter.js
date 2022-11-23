const { Router } = require('express')
const authRouter = Router()
const authController = require('../../controllers/authController')
const { passportLogin, passportSignup } = require('../../middlewares/auth/passport')

//GET login page
authRouter.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})
// POST a login attempt
authRouter.post('/login', passportLogin,
    (req, res) => {
        req.session.user = req.user.username
        res.redirect('/')
    })
// GET login error page
authRouter.get('/login/error', (req, res) => {
    res.sendFile(__dirname + '/public/loginError.html')
})
// GET signup page
authRouter.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
})
// POST a signup attempt
authRouter.post('/signup', passportSignup,
    (req, res) => {
        req.session.user = req.user.username
        res.redirect('/')
    }
)
// GET signup error page
authRouter.get('/signup/error', (req, res) => {
    res.sendFile(__dirname + '/public/signupError.html')
})

module.exports = authRouter