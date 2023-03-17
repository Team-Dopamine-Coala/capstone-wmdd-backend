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
    allergy: {
        type: String
    },
    condition: {
        type: String
    },
    birthday: {
        type: Date
    },
    class_id: {
        type: String
    },
    evaluated: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Student', studentSchema)