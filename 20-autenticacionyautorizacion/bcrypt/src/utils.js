import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(10)

export const createHash = password => bcrypt.hashSync(password, salt)


export const isvalidPasssword = (user, password) => bcrypt.compareSync(password, user.password)


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

