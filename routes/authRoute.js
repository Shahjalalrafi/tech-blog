const router = require('express').Router()

const signUpValidator = require('../validator/auth/signupValidator')
const loginValidator = require('../validator/auth/loginValidator')

const { singUpGetController, singUpPostController, loginGetController, loginPostController, logoutGetController} = require('../controllers/authController')

const { isUnAuthenticated } = require('../middleware/authmiddleware')


router.get('/signUp',isUnAuthenticated, singUpGetController)
router.post('/signUp',isUnAuthenticated, signUpValidator,  singUpPostController)
router.get('/login',isUnAuthenticated, loginGetController)
router.post('/login',isUnAuthenticated, loginValidator, loginPostController)
router.get('/logout', logoutGetController)

module.exports = router