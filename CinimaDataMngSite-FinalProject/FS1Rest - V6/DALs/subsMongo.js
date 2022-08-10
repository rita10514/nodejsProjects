const mongoose = require('mongoose')

let subsSchema = new mongoose.Schema({
    MemberID : String,
    Movies : [
        { movieId : String,
             date : String}
    ],
    
})

module.exports = mongoose.model("subs", subsSchema)