import express from 'express'
import UserRouter from './router/users.routes.js'
import SessionRouter from './router/session.routes.js'


//al ser suna clase el Router hay que instanciarlo.
const usersRouter = new UserRouter()
const sessionRouter = new SessionRouter()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use('/api/sessions', sessionRouter.getRouter())
app.use('/api/users', usersRouter.getRouter())

app.listen(8080, () => {console.log('server listening')})