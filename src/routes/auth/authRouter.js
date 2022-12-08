const { Router } = require('express')
const authRouter = Router()
const authController = require('../../API/controllers/authController')
const { passportLogin, passportSignup } = require('../../middlewares/auth/passport')

//GET login page
authRouter.get('/login', authController.serveLogin)
// POST a login attempt
authRouter.post('/login', passportLogin, authController.postLogin)
// GET login error page
authRouter.get('/login/error', authController.getLoginError )
// GET signup page
authRouter.get('/signup', authController.serveSignup)
// POST a signup attempt
authRouter.post('/signup', passportSignup, authController.trySignup)
// GET signup error page
authRouter.get('/signup/error', authController.serveSignupError)
// POST a logout attempt
authRouter.post('/logout', authController.tryLogout)
// GET logout page
authRouter.get('/logout', authController.serveLogout)

module.exports = authRouter