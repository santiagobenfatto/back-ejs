import passport from 'passport'
import userModel from '../models/user.model.js'
import GitHubStrategy from 'passport-github2'


const initializePassport = () => {
    
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.f9ee312c810856d0',
        clientSecret: '8dd44c949b8e3f6d7fba3c89a5a6a5c095cc3ce1',
        callbackURL:'http://localhost:8080/api/sessions/github-callback',
        scope:['user:email']
    }, async(accesToken, refeshToken, profile, done) => {
        try {
            // {    _json : { 
            //               name: 'alex'
            // }
            //     emails: [{
            //         value:'santi@santi.com'
            //     }]d
            // }
            /* El email siguiente viene desde profile */
            const email = profile.emails[0].value
            const user = await userModel.findOne({email})
            if(!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password: ''
                }
                const result = await userModel.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }

        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
    
}
    /*
    -passport trabaja a manera de middleware
    por eso utiliza .use()
    -Definen como argumentos/parametros los procesos de login
    -Primero: registro
    -Segundo: estrategia 
    -
    */

export default initializePassport
