const User = require('../models/User')

exports.singUpGetController = (req, res, next) => {
    res.render('pages/auth/signup')
}

exports.singUpPostController = async (req, res, next) => {
    console.log(req.body)
    const {username, email, password} = req.body
    let user = new User({
        username,
        email,
        password
    })

    try{
        let createUser = await user.save()
        console.log('user created succesfully', createUser)
        res.render('pages/auth/signup')
    }catch(e) {
        console.log(e)
        next(2)
    }

}

exports.loginGetController = (req, res, next) => {

}

exports.loginPostController = (req, res, next) => {

}

exports.logoutGetController = (req, res, next) => {

}