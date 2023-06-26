import express, { urlencoded } from 'express'
import __dirname from './utils.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.config.js'


const app = express()

//Basic configs
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(express.static(`${__dirname}/public`));

//Middleware para cookies
app.use(cookieParser())

//Passport
initializePassport()
app.use(passport.initialize())

app.use('/api/auth', authRouter)


app.listen(8080, ()=>{
    console.log('Server runnint on port 8080')
})
