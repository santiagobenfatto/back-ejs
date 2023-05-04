import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'

const app = express()
const PORT = process.env.PORT || 8080

//Motor de plantillas o vistas
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)//En que directorio están las vistas
app.set('view engine', 'handlebars')

app.get('/', (req,res) => {
    const user = {
        name: 'Alex'
    }
    //.render(nombre archivo, datos q renderizar)
    res.render('index', user)
})

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
//app.use('/api',)


const connectedServer = app.listen(PORT, () => {console.log(`Server active and listening on port ${PORT}`)})

connectedServer.on('error', (error) => {
    console.error('Error', error)
})