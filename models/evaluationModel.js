const mongoose = require('mongoose')

const Schema = mongoose.Schema

const evaluationSchema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    skillId: {
        type: String
    },
    rating: {
        type: Number
    },
    date: {
        type: Date
    },
    classId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Evaluation', evaluationSchema)