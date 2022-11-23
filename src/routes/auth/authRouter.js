const { Router } = require('express')
const authRouter = Router()
const authController = require('../../controllers/authController')
const passport = require("passport");

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.post('/login', passport.authenticate('login',
        {failureRedirect: '/loginError'}),
    (req, res) => {
        req.session.user = req.user.username
        res.redirect('/')
    })

app.get('/login/error', (req, res) => {
    res.sendFile(__dirname + '/public/loginError.html')
})

authRouter.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
})

authRouter.post('/signup', passport.authenticate('signup',
        {failureRedirect: '/signupError'}),
    (req, res) => {
        req.session.user = req.user.username
        res.redirect('/')
    }
)

authRouter.get('/signup/error', (req, res) => {
    res.sendFile(__dirname + '/public/signupError.html')
})

module.exports = authRouter