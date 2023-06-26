import { Router } from "express";
import { authToken, generateToken } from '../utils.js'
import passport from "passport";

const router = Router()

const users = []

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExists = users.find(u => u.email === email)

        if(userExists) return res.status(400).send({ status: 'error', error: 'User already exists'})

        const user = {
            name,
            email,
            password
        }

        users.push(user)

        //Generamos un token a partir de los datos del user
        const access_token = generateToken(user)

        res.send({ status: 'success', access_token: access_token })

    } catch (error) {
        console.log(error)
        return res.status(500).send({status: 'error', error: error.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = users.find(u => u.email === email && u.password === password)

        if(!user) return res.status(400).send({stauts:'error', error: 'Invalid credentials'})

        const access_token = generateToken(user)

    res.cookie(
        'cookieToken',
        access_token,
        {maxAge: 60 * 60 * 1000, httpOnly: true}
    ).send({status: 'succes, logged in !'})

    } catch (error) {
        console.log(error)
        res.status(500).send({status: 'erorr', error})
    }
})

//Para utilizar passport dejamos de usar el authToken y lo reemplazamos por token ya uqe no usamos mas los headers, sino cookies

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send({status:'success', payload: req.user})
})

export default router