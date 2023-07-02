import express from 'express'
import __dirname from './utils.js'
import routerApp from './routes/app.routes.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import passport from 'passport'
import initializePassport from './config/passport.config.js'


const app = express()
const PORT = process.env.PORT || 8080


try {
    await mongoose.connect('mongodb+srv://santiagobenfatto:u4k1KjqWMp3XTJpu@cluster01.jjqe14l.mongodb.net/passportEstrategias?retryWrites=true&w=majority')
} catch (error) {
    console.log(error)
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`));

// Sessions usando Mongo Storage
app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(), 
        ttl: 15
    }),
    secret: 'Coder39760',
    resave: true,
    saveUninitialized: true
}))


//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Vistas con handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


app.use('/', routerApp)

app.listen(PORT, () => {
    console.log(`Server is active and running on port ${PORT}`)
})