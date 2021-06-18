const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')

const User = require('../models/User')
const errorFormater = require('../utils/validationErrorFormater')

exports.singUpGetController = (req, res, next) => {
   return res.render('pages/auth/signup', {error: {}})
}

exports.singUpPostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormater)

    if(!errors.isEmpty()) {
       return res.render('pages/auth/signup', {error: errors.mapped()})
    }

    const {username, email, password} = req.body

    try{
        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        let createUser = await user.save()
        console.log('user created succesfully', createUser)
        res.render('pages/auth/signup')
    }catch(e) {
        console.log(e)
        next(2)
    }

}

exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login')
}

exports.loginPostController = async (req, res, next) => {
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user) {
            return res.json({
                message: 'authentication failed'
            })
        }


        let match = await bcrypt.compare(password, user.password)
        if(!match) {
            return res.json({
                message: 'authentication failed'
            })
        }

        console.log('login succesfully', user)
        res.render('pages/auth/login')

    }catch(e) {
        console.log(e)
    }
}

exports.logoutGetController = (req, res, next) => {

}