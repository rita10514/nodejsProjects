const mongoose = require('mongoose')

let sessionSchema = new mongoose.Schema({
    userName : String,
    psw : String
})

module.exports = mongoose.model("session", sessionSchema)