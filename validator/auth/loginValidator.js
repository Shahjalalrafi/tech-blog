const { body } = require('express-validator')

// const User = require('../../models/User')

module.exports = [
    body('email')
    .not().isEmpty().withMessage('email can not be empty'),

    body('password')
    .not().isEmpty().withMessage('password can not be empty')
]