const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    present: {
        type: Boolean
    },
    studentId: {
        type: String,
        required: true
    },
    classId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Attendance', attendanceSchema)