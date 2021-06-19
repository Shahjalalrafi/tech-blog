const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const errorFormater = require('../utils/validationErrorFormater')

exports.singUpGetController = (req, res, next) => {
    return res.render('pages/auth/signup', { error: {}, value: {} })
}

exports.singUpPostController = async (req, res, next) => {
    const { username, email, password } = req.body
    let errors = validationResult(req).formatWith(errorFormater)

    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        return res.render('pages/auth/signup', {
            error: errors.mapped(),
            value: {
                username, email, password
            }
        })
    }


    try {
        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        let createUser = await user.save()
        console.log('user created succesfully', createUser)
        res.render('pages/auth/signup')
    } catch (e) {
        console.log(e)
        next(2)
    }

}

exports.loginGetController = (req, res, next) => {
    console.log(req.session.isLogeIn, req.session.user)
    res.render('pages/auth/login', { error: {} })
}

exports.loginPostController = async (req, res, next) => {

    const { email, password } = req.body
    let errors = validationResult(req).formatWith(errorFormater)

    if (!errors.isEmpty()) {
        let error = errors.mapped()
        return res.render('pages/auth/login', {
            error
        })
    }

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.json({
                message: 'authentication failed'
            })
        }


        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({
                message: 'authentication failed'
            })
        }

        req.session.isLogedIn = true,
            req.session.user = user
        req.session.save(err => {
            if (err) {
                console.log(err)
                return next(err)
            }
            res.redirect('/dashboard')

        })


    } catch (e) {
        console.log(e)
    }
}

exports.logoutGetController = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err)
        return next(err)
    })

    return res.redirect('/auth/login')
}