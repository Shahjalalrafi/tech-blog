const router = require('express').Router()

const {check, validationResult } = require('express-validator')



const Flash = require('../utils/Flash')

router.get('/validator', (req, res, next) => {
    console.log(Flash.getMessage(req))
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

    if(!errors.isEmpty()) {
        req.flash('fail', 'there is some Error')
    }else {
        req.flash('success', 'There is no Error')
    }

    res.redirect('/playground/validator')
})

module.exports = router