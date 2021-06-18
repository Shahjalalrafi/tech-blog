const router = require('express').Router()

const {check, validationResult } = require('express-validator')

router.get('/validator', (req, res, next) => {
    res.render('playground/signup')
})

router.post('/validator',
[
    check('username')
    .not()
    .isEmpty()
    .withMessage('username can not be empty')
    .isLength({max: 15})
    .withMessage('user can not be greather that 15')
    .trim(),

    check('email')
    .isEmail()
    .withMessage('email can not be empty')
    .normalizeEmail(),

    check('password')
    .custom(value => {
        if(value.length < 5) {
            throw new Error('password must be greather than 5 character')
        }
        return true
    }),

    check('confirmPassword')
    .custom((value, {req}) => {
        if( value !== req.body.password) {
            throw new Error('password does not match')
        }
    })
], (req, res, next) => {
    const errors = validationResult(req)

    const formetter = (error) => error.msg
    console.log(errors)
    console.log(errors.formatWith(formetter).mapped())
    res.render('playground/signup')
})

module.exports = router