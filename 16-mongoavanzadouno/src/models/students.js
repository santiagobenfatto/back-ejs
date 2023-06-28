import mongoose from 'mongoose'

const studentCollection = 'students'

const studentSchema = mongoose.Schema({
    first_name: String, 
    last_name: String,
    email: String,
    gender: String, 
    courses:{
        type: [
            {
                course: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'courses'
                }
            }
        ],
        default: []
    }
})

//Establecemos un middleware a nivel del model para no tener que 
// escribir siempre el populate en todos los find
studentSchema.pre('find', function(){
    this.populate('courses.course')
})


const studentModel = mongoose.model(studentCollection, studentSchema)

export default studentModel