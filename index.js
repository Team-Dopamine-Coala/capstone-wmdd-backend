require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// const activityRoutes = require('./routes/activity')
// const clientRoutes = require('./routes/client')
// const noteRoutes = require('./routes/note')
// const userRoutes = require('./routes/user')
// const gmailRoutes = require('./routes/gmail')

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
// app.use('/api/activities', activityRoutes)
// app.use('/api/clients', clientRoutes)
// app.use('/api/notes', noteRoutes)
// app.use('/api/users', userRoutes)
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