const mongoose = require('mongoose')

let usersSchema = new mongoose.Schema({
    userName : String,
    psw : String
})

module.exports = mongoose.model("users", usersSchema)