import mongoose from "mongoose";
import studentModel from "./models/students.js";
import courseModel from "./models/courses.js";

const environment = async () => {
    try {
        await mongoose.connect('mongodb+srv://santiagobenfatto:u4k1KjqWMp3XTJpu@cluster01.jjqe14l.mongodb.net/clase16?retryWrites=true&w=majority')
        //const response  = await userModel.find({first_name: 'Alex'}).explain('executionStats')
    
        // await studentModel.create({
        // first_name: "hilda",
        // last_name: 'Lizarazu',
        // email: 'che@donthace.com',
        // gente: 'Aleatory'
        // })

        // await courseModel.create({
        //     title: 'Curso de Backend',
        //     description: 'Es un curso medio meh',difficulty: 5,
        //     topics: ['Js', 'Servers', 'Handlebars', 'Middlewares'], 
        //     professor: 'Alex'
        // })



        const student = await studentModel.findOne({_id:'646b9c966cd4cd2e0555f726'})
        
        // console.log(student)
    
        // student.courses.push({course: '646b9c976cd4cd2e0555f728'})

        // const result = await studentModel.updateOne({_id: '646b9c966cd4cd2e0555f726'}, student)

        // console.log(result)

        const response = await studentModel.find()

        console.log(JSON.stringify(response, null, '\t'))

        console.log('Termino el proceso')

    } catch (error) {
        console.log(error)
    }

}

environment()

