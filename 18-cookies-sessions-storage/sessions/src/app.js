import express from 'express'
import session from 'express-session'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


function auth(req, res, next){
    if(req.session?.user === 'santi' && req.session?.admin){
        return next()
    }
    return res.status(401).send('error de autenticación')
}


app.use(session({
    secret:'Coder-sign',
    resave: true,
    saveUninitialized: true
}))

app.get('/session', (req,res) => {
    if(req.session.counter) {
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter}`)
    } else{
        req.session.counter=1
        res.send('Bienvenido!!')
    }
})

app.get('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(!err) res.send('logout')
        else res.send({status:'logoutERROR', body: err})
    })
})

app.get('/login', (req, res) => {
    const { username, password } = req.query

    if(username !== 'santi' || password !== 'santipass'){
        return res.send('login failes')
    }
    req.session.user = username
    req.session.admin = true
    res.send('login success')
})

app.get('/privado', auth, (req,res) => {
    res.send('estas logueado')

})

app.listen(8080)