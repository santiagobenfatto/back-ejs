import express from "express";

const app = express()
const PORT = process.env.PORT || 8080
const users = [
    {id:1, nombre:"santi", apellido:"alguno", edad:30},
    {id:2, nombre:"jorge", apellido:"notiene", edad:32},
    {id:3, nombre:"alex", apellido:"teacher", edad:28},
    {id:4, nombre:"diego", apellido:"del valle", edad:30},
]

app.get('/bienvenida', (req,res) => {
    res.send(`<h1 style='color:red'> HOLA CODER!</h1>`)
})

app.get('/users', (req,res) => {
    res.send(users)
})

app.get('/users/:idUsuario', (req,res) => {
    let userID = parseInt(req.params.idUsuario)
    
    let user = users.find(u => u.id === userID)

    // if(!user) return res.send({error: "usuario no encontrado"})

    res.send({user})
})

app.listen(PORT,()=>{console.log(`servidor activo y escuchando en el puerto ${PORT}`)})