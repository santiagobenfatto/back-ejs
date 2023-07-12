import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
//app.use(cors())
//Si conocemos el dominio donde será desplegado el front:
app.use(cors({
    origin: ['http://rappi.com']
}))


app.get('/test', (req, res) => {
    res.json({Message:` Saludos desde el server`})
})

app.listen(8080, () => { console.log(`Server runnint on port 8080`)})

