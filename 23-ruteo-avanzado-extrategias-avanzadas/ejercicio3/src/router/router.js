import { Router as expressRouter } from 'express'
import jwt from 'jsonwebtoken'
/*

Métodos que tiene el router: 
GET, POST, PUT, PATCH, DELETE

*/

export default class Router {
    constructor(){
        this.router = expressRouter()
        this.init()
    }

    getRouter(){
        return this.router
    }
    
    //el método init() se instancia para que pueda ser utilizada por las clases hijas de router
    init(){}

    /*
    El método get recibe:
    un path '/path'
    funcion pasa como parámetro múltiples callbacks '(req, res) => {}'
    
    this.generateCustomResponse entre medio de patch y this.applyCallbacks 
    para que funcion like a middleware
    */
    
    get(path, policies, ...callbacks){
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }


    post(path, policies, ...callbacks){
        this.router.post(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }


    /* 
    HANDLEAR POLITICAS
    */


    handlePolicies = (policies) => (req, res, next) => {
        if(policies[0] == 'PUBLIC') return next()

        const authToken = req.headers['authorization'] || req.headers['Authorization']

        if(!authToken) return res.status(401).json({ message: 'No token provide' })

        const token = authToken.split(' ')[1]

        const user = jwt.verify(token, 'secretSecret')

        if(!policies.includes(user.role.toUpperCase())){
            return res.status(403).json({ message: 'Forbidden'})
        }
        req.user = user
        next()
    }



    /* 
    Custom Response lo hacemos con funcion flecha
    para aprovechar los beneficios que nos da a la hora
    de utilizar la palabra reservada this.
    */

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = (data) => {
            res.status(200).json({ data });
        }
        res.sendServerError = (error) => {
            res.status(500).json({ error});
        }
        res.sendClientError = (error) => {
            res.status(400).json({ error })
        }
        next()
    }

    applyCallbacks(callbacks){
        return callbacks.map((callback) => async(...params) => {
            try {
                await callback.apply(this, params)//req, res, next
            } catch (error) {
                params[1].status(500).json({ error: error.message })
            }

        })
    }

}