import dotenv from 'dotenv'

const environment = 'PRODUCTION'
dotenv.config({
    path:environment==='DEVELOPMENT'? './.env.development' : './.env.production'
})


export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
}