import mongoose, { mongo } from 'mongoose'


export default class MongoSingleton {
    static #instance
    contructor(){
        mongoose.connect('mongodb+srv://santiagobenfatto:coderprueba@cluster01.jjqe14l.mongodb.net/27Singleton?retryWrites=true&w=majority')
    }

    static getInstance() {
        if(this.#instance) {
            console.log(`La conexion ya existe`)
            return this.#instance
        }

        console.log(`La conexion no existe, se crea una nueva.`)
        this.#instance = new MongoSingleton()
        return this.#instance
    }

}



