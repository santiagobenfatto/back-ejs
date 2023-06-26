import Router from './router.js'

export default class UserRouter extends Router{
    //Al ser clase hija se encargará de implementar el init()
    init() {
        this.get('/', (req, res) => {
            res.send('Hello World!')
        })
    }
}