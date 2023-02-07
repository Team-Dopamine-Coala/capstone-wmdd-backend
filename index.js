require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const attendanceRoutes = require('./routes/attendance')
const classRoutes = require('./routes/class')
const evaluationRoutes = require('./routes/evaluation')
const levelRoutes = require('./routes/level')
const programRoutes = require('./routes/program')
const skillRoutes = require('./routes/skill')
const studentRoutes = require('./routes/student')
const userRoutes = require('./routes/user')

// Express App
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/attendance', attendanceRoutes)
app.use('/api/class', classRoutes)
app.use('/api/evaluation', evaluationRoutes)
app.use('/api/level', levelRoutes)
app.use('/api/program', programRoutes)
app.use('/api/skill', skillRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

// Connect to db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })