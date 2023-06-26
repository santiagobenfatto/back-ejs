import Router from './router.js'
import jwt from 'jsonwebtoken'

export default class SessionRouter extends Router {
    init() {
        //Para la muestra de clase, el middleware lo hardcodeamos aquí:
       try {
        this.post('/login', ['PUBLIC'], (req,res) => {
            const user = {
                email: req.body.email,
                role: 'USER'
            }

            const token = jwt.sign(user, 'secretSecret')
            res.sendSuccess({ token })
        })
       } catch (error) {
        res.sendServerError(error.message)
       }
    }
}