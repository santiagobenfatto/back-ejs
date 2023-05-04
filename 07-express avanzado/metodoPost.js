import express from 'express'

const app = express()
const PORT = process.env.PORT || 8081


app.use(express.json())

const users = []

/* CRUD completo */

//Read
app.get('/users',(req,res)=>{
    res.send(users)
})

//Create
app.post('/users', (req,res)=>{
    // {
    //     first_name: 'Santi',
    //     last_name: ' Benfa'
    // }
    const user = req.body
    user.id = 1

    if(!user.first_name || !user.last_name){
        return res.status(400).send({status: 'error', error: 'incomplete values'})
    }
    users.push(user)
    res.send({status: 'success', message: 'user created'})
})

//Update - put
app.put('/users/:id', (req,res)=>{
    const user = req.body
    const userId = Number(req.params.id)

    if(!user.first_name || !user.last_name){
        return res.status(400).send({status: 'error', error: 'incomplete values'})
    }
    
    const index = users.findIndex(u => u.id === userId)

    if(index !== -1){
        users[index] = user
        user.id = userId
        res.send({status: 'success', message: 'user updated'})
    } else {
        res.status(404).send({status: 'error', error: 'user not found'})
    }
})

//Delete
app.delete('/users/:id', (req,res)=>{
    const userId = Number(req.params.id)
    const index = users.findIndex(u => u.id === userId)

    if(index !== -1){
        users.splice(index, 1)
        res.send({status: 'succes', message: 'user deleted'})
    } else {
        res.status(404).send({status:'error', error:'user not found'})
    }

})





app.listen(PORT, console.log(`Servidor activo y  escuchando en el puerto ${PORT}`))