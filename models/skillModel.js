const mongoose = require('mongoose')

const Schema = mongoose.Schema

const skillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    level: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Skill', skillSchema)