const router = require('express').Router()
const User = require('../models/User')
const { body } = require('express-validator')

const { singUpGetController, singUpPostController, loginGetController, loginPostController, logoutGetController} = require('../controllers/authController')

const signUpValidator = [
    body('username')
    .isLength({min: 2 , max: 15}).withMessage('username must be between 2 and 15')
    .custom(async username => {
        const user = await User.findOne({username})
        if(user) {
            return Promise.reject('username already in used')
        }
    })
    .trim(),
    body('email')
    .isEmail().withMessage('please provide a valid email')
    .custom(async email => {
        const user = await User.findOne({email})
        if(user) {
            return Promise.reject('username already in used')
        }
    })
    .normalizeEmail(),
    body('password')
    .isLength({min:5}).withMessage('password must be greater than 5'),

    body('confirmPassword')
    .custom(async(confirmPassword, {req}) => {
        if(confirmPassword !== req.body.password) {
            throw new Error('password does not match')
        }
        return true
    })
]

router.get('/signUp', singUpGetController)
router.post('/signUp', signUpValidator,  singUpPostController)
router.get('/login', loginGetController)
router.post('/login', loginPostController)
router.get('/logout', logoutGetController)

module.exports = router