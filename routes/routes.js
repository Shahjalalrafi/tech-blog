const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
const playGroundRoute = require('../playground/play')

const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/playground',
        handler: playGroundRoute
    },
    {
        path: '/',
        handler: (req, res) => {
            res.json({
                message: 'hello world'
            })
        }
    },
]

module.exports = app => {
    routes.forEach(r => {
        if (r.path === '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}