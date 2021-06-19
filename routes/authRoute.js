const router = require('express').Router()

const signUpValidator = require('../validator/auth/signupValidator')
const loginValidator = require('../validator/auth/loginValidator')

const { singUpGetController, singUpPostController, loginGetController, loginPostController, logoutGetController} = require('../controllers/authController')


router.get('/signUp', singUpGetController)
router.post('/signUp', signUpValidator,  singUpPostController)
router.get('/login', loginGetController)
router.post('/login', loginValidator, loginPostController)
router.get('/logout', logoutGetController)

module.exports = router