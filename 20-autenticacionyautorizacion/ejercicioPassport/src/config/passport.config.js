import passport from 'passport'
import local from 'passport-local'
import userModel from '../models/user.model.js'
import { createHash, isvalidPasssword } from '../utils.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {
    /*
    -passport trabaja a manera de middleware
    por eso utiliza .use()
    -Definen como argumentos/parametros los procesos de login
    -Primero: registro
    -Segundo: estrategia 
    -
    */
    passport.use('register', new LocalStrategy({
        //Primer flag para acceder al objeto req como cualquier otro middleware
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body
        
        try {
        const user = await userModel.findOne({ email: username })
        
        if(user) {
            return done(null, false)
        }

        const userToSave = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        }

        const result = await userModel.create(userToSave)
        return done(null, result)

        } catch (error) {
            return done(`Error al obtener el usuario: ${error}`)
        }
    }))

    passport.use('login', new LocalStrategy({
        //Solo usamos el email
        usernameField: 'email'
        //Debajo ya no se necesita el req.
    }, async (username, password, done) => {
        
        try {
            const user = await userModel.findOne({ email: username })
            
            if(!user) {
                return done(null, false)
            }

            if(!isvalidPasssword(user, password)) return done(null, false)

            return done(null, user)
            //Si todo fue bien passport setea req.user

        } catch (error) {
            return done(`Error al obtener el usuario: ${error}`)
        }
    }))


    //dos métodos o procesos que debe implementar passport para 
    // para poder implementar los datos


    /* 
    Primero es la serializacion:
        -Serializa los datos de dicho usuario    
        -Almacena el identificador del usuario que acaba de iniar sesion
    */
   passport.serializeUser((user, done) => {
    done(null, user._id)
   })

   /* 
   Segundo deserializar
    -para obtener los datos del usuario
   */

    passport.deserializeUser( async (id, done) =>{
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport

