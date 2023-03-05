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
    },
    programId: {
        type: String
    },
    videoUrl:{
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Skill', skillSchema)