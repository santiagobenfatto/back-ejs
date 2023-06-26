import { Router as expressRouter } from 'express'

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
    */
    
    get(path, ...callbacks){
        this.router.get(
            path,
            this.applyCallbacks(callbacks)
        )
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