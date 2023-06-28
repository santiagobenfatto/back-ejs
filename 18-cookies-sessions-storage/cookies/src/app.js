import express from 'express'
import cookieParser from 'cookie-parser'
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
const app = express()


app.use(cookieParser('secret'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')



app.get('/', (req, res) =>{
    res.render('cookies')
})

app.post('/cookie', (req,res) =>{
    const data = req.body
    res.cookie(
        'setCookie',
        data,
        {maxAge:10000}
        )
    .send({status:'success', message: 'cookie seted'})
})

// app.get('/setCookie', (req,res)=>{
//     res.cookie('CookieKey', 'Este es el valor de la cookie', {maxAge:60000})
//     .send('Cookie seteada')
// })


// app.get('/getCookie', (req,res)=>{
//     res.send(req.cookies)
// })

// app.get('/deleteCookie', (req,res)=>{
//     res.clearCookie('CookieKey').send('Cookie deleted')
// })

// app.get('/setSignedCookie', (req,res)=>{
//     res.cookie(
//         'signedCookieKey',
//         'Valor de la cookie firmada(o signed)',
//         {maxAge: 30000, signed: true}
//         )
//     .send('Mensaje de la cookie firmada')
// })

// app.get('/getSignedCookie', (req, res) => {
//     res.send(req.signedCookies)
// })

app.listen(8080)