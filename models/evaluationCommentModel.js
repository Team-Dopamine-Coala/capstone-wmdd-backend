const mongoose = require('mongoose')

const Schema = mongoose.Schema

const evaluationCommentSchema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    classId: {
        type: String
    },
    comment: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Evaluation Comment', evaluationCommentSchema)