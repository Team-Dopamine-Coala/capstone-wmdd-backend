const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    studentList: {
        type: Array
    },
    programId: {
        type: String
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Class', classSchema)