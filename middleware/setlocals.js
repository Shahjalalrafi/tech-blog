exports.setlocals = () => {
    return (req, res, next) => {
        res.locals.user = req.user
        res.locals.isLogedIn = req.session.isLogedIn

        next()
    }
}