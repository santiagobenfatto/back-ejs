import { Router } from 'express'
import { userModel } from '../models/user.model.js'
import mongoose from 'mongoose'

const router = Router()


//READ

router.get('/', async (req, res) => {
    try{
        //el userModel reemplaza a 'db.usuarios'
        const users = await userModel.find()
        res.send({ result: 'success', payload: users})
    } catch (error) {
        res.status(500).send({error})
    }
})

//CREATE

router.post('/', async (req,res) => {
    const { first_name, last_name, email } = req.body

    if(!first_name || !last_name || !email){
        return res.status(400).send({error: 'incomplete values'})
    }

    try{
        const result = await userModel.create({
            first_name,
            last_name,
            email
        })
        res.send({status:'success', payload: result})
    }catch(error){
        res.status(500).send({error})
    }

})

//UPDATE 

router.put('/:uid', async(req,res)=>{
    const { uid }  = req.params
    const userUpdates = req.body
    
    if(!userUpdates.first_name || !userUpdates.last_name || !userUpdates.email){
        return res.status(400).send({error: 'incomplete values'})
    }

    try{
        const result = await userModel.updateOne({_id: uid}, userUpdates)
        res.send({status:'success', payload: result})
    }catch(error){
        res.status(500).send({error})
    }


})

router.delete('/:uid', async(req,res) => {
    const { uid } = req.params

    try{
        const result = await userModel.deleteOne({_id: uid})
        res.send({status:'success', payload: result})
    }catch(error){
        res.status(500).send({error})
    }

})


export default router