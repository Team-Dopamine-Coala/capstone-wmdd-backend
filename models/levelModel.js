const mongoose = require('mongoose')

const Schema = mongoose.Schema

const levelSchema = new Schema({
    title: {
        type: String
    },
    unit: {
        type: String
    },
    skills: {
        type: Array
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Level', levelSchema)