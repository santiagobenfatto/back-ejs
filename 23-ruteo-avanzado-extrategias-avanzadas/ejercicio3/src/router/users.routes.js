import Router from './router.js'

export default class UserRouter extends Router{
    //Al ser clase hija se encargará de implementar el init()
    init() {
        this.get('/', ['PUBLIC'], (req, res) => {
            //res.send('Hello World!')
            //Como ya definí el generateCustomResponse.:
            res.sendSuccess('Hello world desde generateCustomResponse()')
        })

        this.get('/current-user', ['ADMIN','PREMIUM', 'USER'], (req, res) => {
            res.sendSuccess(req.user)
        })

    }
}