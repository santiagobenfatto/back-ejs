import { Router } from 'express'
import { generateToken, authToken } from '../utils.js'

const router = Router()

const users = []

router.post('/register', async (req,res) => {
    try {
        const {name, email, password} = req.body
        const exists = users.find(user => user.email === email)

        if (exists) return res.status(400).send({status: 'error', error: 'User already exists'})

        const user = {
            name,
            email, 
            password
        }

        users.push(user)
        
        const access_token = generateToken(user)
        
        res.send({status:'success', access_token})
    
    } catch (error) {
    
        res.status(500).send({status: 'error', error: error.message})
    
    }
})

router.post('/login', async (req,res) => {
    try {
        const { email, password } = req.body

        const user = users.find(user => user.email === email && user.password === password)

        if(!user) return res.status(403).send({error:'Invalid Credentials'})
        
        const accessToken = generateToken(user)
        
        res.send({status: 'success', access_token: accessToken})

    } catch (error) {
        console.log(error)
        res.status(500).send({status:'error'})
    }
})

router.get('/current', authToken, (req, res) => {
    res.send({status:'success', payload: req.user})
})

export default router