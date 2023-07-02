import express from 'express'
import __dirname from './utils.js'
import authRouter from './routes/auth.routes.js'

const app = express()
const PORT = process.env.PORT || 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`));

app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server is active and running on port ${PORT}`)
})