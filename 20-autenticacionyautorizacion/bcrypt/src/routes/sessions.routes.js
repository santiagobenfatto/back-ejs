import { Router } from "express";
import userModel from '../models/user.model.js'
import { createHash, isvalidPasssword } from '../utils.js'

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password} = req.body
        const exists = await userModel.findOne({email})
        
        if(exists) return res.status(400).send({status:'error', error: 'User already exists'})
        
        const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        }

        await userModel.create(user)
        res.send({status: 'succes', message: 'User registered'})


    } catch (error) {
        res.status(500).send({status: 'error', error})
    }
    })

router.post('/login', async (req, res) => {
    try {
        const { email, password }  = req.body

    const user = await userModel.findOne({ email })

    if(!user) return res.status(400).send({status: 'error', error: 'User not found'})

    //isValidPassword retorna un booleano
    if(!isvalidPasssword(user, password)) return res.status(401).send({status: ' error', error: 'Incorrect Credentials'})

    //Antes de almacenar el password en la sesion lo borramos.
    delete user.password
    req.session.user = user

    res.send({ status: 'success', message: 'Login success'})
    } catch (error) {
        res.status(500).send({status: 'error', error: error})
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({status:' error', error: 'Logout Fialed'})
        res.redirect('/')
    })

})


export default router