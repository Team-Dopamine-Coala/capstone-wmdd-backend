const mongoose = require('mongoose')

const Schema = mongoose.Schema

const programSchema = new Schema({
    name: {
        type: String
    },
    levels: {
        type: Array
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Program', programSchema)