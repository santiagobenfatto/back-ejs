import { Router } from "express";

const router = Router()

router.get('/login', (req, res) => {
    //Renderiza vista Login:
    res.render('login')
})

router.get('/', (req, res) => {
    //Renderiza vista PROFILE con datos del usuario
    // que se pasan como segundo parámetro dentro del obj
    res.render('home')
})


export default router