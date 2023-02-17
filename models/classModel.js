const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classSchema = new Schema({
    title: {
        type: String,
        required: true
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
    },
    classDay: {
        type: Array
    },
    programId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Class', classSchema)