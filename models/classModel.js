const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    classDay: {
        type: Array
    },
    programId: {
        type: String
    },
    completed: {
        type: Boolean
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Class', classSchema)