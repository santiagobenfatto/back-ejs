import express from 'express'
import UserRouter from './router/users.router.js'


//al ser suna clase el Router hay que instanciarlo.
const usersRouter = new UserRouter()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use('/api/users', usersRouter.getRouter())

app.listen(8080, () => {console.log('server listening')})