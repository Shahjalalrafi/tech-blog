const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const errorFormater = require('../utils/validationErrorFormater')
const Flash = require('../utils/Flash')

exports.singUpGetController = (req, res, next) => {
    return res.render('pages/auth/signup',
        {
            title: "sign up page",
            error: {},
            value: {},
            flashMessage: Flash.getMessage(req)
        })
}

exports.singUpPostController = async (req, res, next) => {
    const { username, email, password } = req.body
    let errors = validationResult(req).formatWith(errorFormater)

    if (!errors.isEmpty()) {
        req.flash('fail', 'please check your form')
        return res.render('pages/auth/signup', {
            title: "signUp",
            error: errors.mapped(),
            value: {
                username, email, password
            },
            flashMessage: Flash.getMessage(req)
        })
    }


    try {
        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        await user.save()
        req.flash('success', 'user created succesfully')
        res.redirect('pages/auth/login')
    } catch (e) {
        console.log(e)
        next(2)
    }

}

exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login',
        {
            title: "login",
            error: {},
            flashMessage: Flash.getMessage(req)
        })
}

exports.loginPostController = async (req, res, next) => {

    const { email, password } = req.body
    let errors = validationResult(req).formatWith(errorFormater)

    if (!errors.isEmpty()) {
        req.flash('fail', 'please check your form')
        return res.render('pages/auth/login', {
            title: "login",
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req)
        })
    }

    try {
        let user = await User.findOne({ email })
        if (!user) {
            req.flash('fail', 'please provide valid credentials')
            return res.render('pages/auth/login', {
                title: "login",
                error: {},
                flashMessage: Flash.getMessage(req)
            })
        }


        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            req.flash('fail', 'please provide valid credentials')
            return res.render('pages/auth/login', {
                title: "login",
                error: {},
                flashMessage: Flash.getMessage(req)
            })
        }

        req.session.isLogedIn = true,
            req.session.user = user
        req.session.save(err => {
            if (err) {
                console.log(err)
                return next(err)
            }
            req.flash('success', 'successfully loged in')
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
    // req.flash('success', 'successfully log out')
    return res.redirect('/auth/login')
}