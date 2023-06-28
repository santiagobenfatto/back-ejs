import express from 'express'
import userRouter from './routes/user.router.js'
//Importar dependencia mongoose aquí para poder conectar con la DB
import mongoose from 'mongoose'

const app = express()

//Nunca deben faltar las siguientes dos líneas
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', userRouter)

try{
    await mongoose.connect('mongodb+srv://santiagobenfatto:u4k1KjqWMp3XTJpu@cluster01.jjqe14l.mongodb.net/?retryWrites=true&w=majority')
    console.log('DB connected')
}
catch(error){
    console.log(error)
}


app.listen(8080)