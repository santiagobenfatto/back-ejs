import { fileURLToPath } from 'url'
import { dirname } from 'path'
import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'ClavePrivada'

export const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn:'24h'})
    return token
}

//authToken es un Middleware
export const authToken = (req, res, next) => {
    const authHeader= req.headers.authorization
    if(!authHeader) return res.status(401).send ({error: 'no authorization'})

    //Separamos el 'Bearer'
    const token = authHeader.split(' ')[1]
    
    //Verify
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        //Si todo está bien se descrifra el token
        req.user = credentials.user
        next()
    })
}




const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname