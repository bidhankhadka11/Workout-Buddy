const mongoose = require('mongoose')
//mongoose helps us create schemas for our data that will be stored in the database

const Schema = mongoose.Schema

//In the schema the first arguement is an object that defines how the schema looks
//The second arguement will automatically add a created time property
//Schema = structure
const workoutSchema = new Schema({ 
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    }, 
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})

//We are exporting a model of the schema
module.exports = mongoose.model('Workout', workoutSchema)