import { Router } from "express";

const router = Router()

//Accesos públicos y privados con middleware:
const publicAccess = (req, res, next) => {
    if(req.session.user) return res.redirect('/')
    next()
}

const privateAccess = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login')
    next()
}


router.get('/register', publicAccess, (req, res) => {
    //Renderiza vista Register:
    res.render('register')
})

router.get('/login', publicAccess, (req, res) => {
    //Renderiza vista Login:
    res.render('login')
})

router.get('/', privateAccess, (req, res) => {
    //Renderiza vista PROFILE con datos del usuario
    // que se pasan como segundo parámetro dentro del obj
    res.render('profile', {
        user: req.session.user
    })
})


export default router