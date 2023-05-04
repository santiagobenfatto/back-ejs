import express from 'express';
import { Router } from 'express';

const router = Router()

const food = [
        {name: "Pizza", price: 2200 },
        {name: "Hamburguesa", price: 1700 },
        {name: "Pollo frito", price: 1300 },
        {name: "Papas fritas", price: 1500 },
        {name: "Super Pancho", price: 2700 }
    ]
    
router.get('/', (req, res) => {
        const user = {
            name: 'Sebastian',
            role: 'admin'
        }

        //.render(nombre archivo, datos q renderizar)
        res.render('index', {
            user,
            isAdmin: user.role === 'admin',
            food,
        })
    })

    router.get('/register', (req, res) => {
        res.render('register')
    })

    export default router