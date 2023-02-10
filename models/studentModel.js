const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    guardianName: {
        type: String
    },
    guardianRelationship: {
        type: String
    },
    guardianEmail: {
        type: String
    },
    guardianNumber: {
        type: String
    },
    medicalInfo: {
        type: String
    },
    birthday: {
        type: Date
    },
    classId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Student', studentSchema)