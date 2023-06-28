import mongoose from "mongoose";


/* 

===== No están cargados los 5000 usuarios así que no se puede probar ===== 

*/


const userCollection = 'users'

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        index
    },
    email: String,
    gender: String,
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel