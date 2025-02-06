require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//express app
const app = express()

//middleware
app.use(express.json())
//helps us access the post request body. Attaches the request to the req.

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})

//routes
// app.get('/', (req, res) => {
//     res.json({mssg: 'Welcome to the app'})
// })
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log('Connected to db & Listening on port', process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })
