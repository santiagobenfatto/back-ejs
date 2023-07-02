import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import __dirname from './utils.js';

const fileStorage = FileStore(session);

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function auth(req, res, next) {
    if (req.session?.user === 'santi' && req.session?.admin) {
        return next();
    }

    return res.status(401).send('error de autenticación')
}

//Sessiones usando file storage
// app.use(session({
//     store: new fileStorage({path:`${__dirname}/sessions`, ttl:100, retries:0}),
//     secret:'Coder-sign',
//     resave: true,
//     saveUninitialized: true
// }))


// Sessions usnado Mongo Storage
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://santiagobenfatto:u4k1KjqWMp3XTJpu@cluster01.jjqe14l.mongodb.net/clase18?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15
    }),
    secret: 'Coder39760',
    resave: true,
    saveUninitialized: true
}))

app.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        res.send('Bienvenido');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send('Ok')
        else res.send({ status: 'error', error: err })
    })
});


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


