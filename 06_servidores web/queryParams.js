import express from 'express'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({extended:true}))

app.get('/exampleQuery', (req,res)=>{
    let consultas = req.query
    let {nombre, apellido, edad} = req.query
    res.send({consultas})
})

app.listen(PORT, ()=>{console.log(`Servidor activo y escuchando en el puerto ${PORT}`)})