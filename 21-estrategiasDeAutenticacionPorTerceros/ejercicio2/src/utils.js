import { fileURLToPath } from 'url'
import { dirname } from 'path'
import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'CoderPrivateKey'

export const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, { expiresIn: '24h'})
    return token
}

export const authToken = (req, res, next) => {
    //El token viene desde los headers de autorización
    const authHeader = req.headers.authorization
    
    if(!authHeader) return res.status(401).status({status:'error', error: 'No authorization'})

    /* 
    El token de acceso guardado en la constante authHeader
    tiene el siguiente formato siempre:

    'Bearer dsfafwbf4bfwibfobbsa'
    
    Por lo tanto hay que eliminarle la palabra Bearer
    con un split(' ')[1]
    */
    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        //jwt verifica con verify el token existente
        if(error) return res.status(403).send({error: 'Not authorized'})
        req.user = credentials.user
        next()
    })
}



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

