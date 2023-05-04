import express from 'express'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import userRouter from './routes/users.router.js'
import __dirname from './utils.js'

const app = express()
const PORT = process.env.PORT || 8080

//Motor de plantillas o vistas
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)//En que directorio están las vistas
app.set('view engine', 'handlebars')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(express.static(`${__dirname}/public`))
app.use('/', viewsRouter)
app.use('/api/users', userRouter)




const connectedServer = app.listen(PORT, () => {console.log(`Server active and listening on port ${PORT}`)})

connectedServer.on('error', (error) => {
    console.error('Error', error)
})