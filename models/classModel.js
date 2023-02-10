const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    LevelId: {
        type: Array
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
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Class', classSchema)