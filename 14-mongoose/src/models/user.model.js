import mongoose from 'mongoose'

//Definimos nombre de Collecion ('Usuarios'),
//LO trabaja automáticamente mongoose
const userCollection = 'usuarios'

// {
//     firt_name: 'Alex',
//     last_name: 'Pinaida',
//     email: 'ap@hotmail.com'
// }

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true //No puede haber 2 iguales
    }
})

export const userModel = mongoose.model(userCollection, userSchema)