import express from 'express'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

const server = app.listen(PORT, () => {console.log(`Server active and running on port ${PORT}`)})

const socketServer = new Server(server)

socketServer.on('connection', socket => {
    console.log('New client connected')
    
    socket.on('message', data => {
        console.log(data)
    })
})

