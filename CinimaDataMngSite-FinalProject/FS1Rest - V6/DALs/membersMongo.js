const mongoose = require('mongoose')

let membersSchema = new mongoose.Schema({
    Name : String,
    Email : String,
    City : String
})

module.exports = mongoose.model('members', membersSchema)