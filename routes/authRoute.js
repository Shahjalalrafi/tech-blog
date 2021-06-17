const router = require('express').Router()

const { singUpGetController, singUpPostController, loginGetController, loginPostController, logoutGetController} = require('../controllers/authController')

router.get('/signUp', singUpGetController)
router.post('/signUp', singUpPostController)
router.get('/login', loginGetController)
router.post('/login', loginPostController)
router.get('/logout', logoutGetController)

module.exports = router