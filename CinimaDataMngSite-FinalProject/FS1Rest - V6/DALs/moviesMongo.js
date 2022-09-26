const mongoose = require('mongoose')

let moviesSchema = new mongoose.Schema({
    Name : String,
    Genres : [String],
    Image : String,
    Premiered : String
})

module.exports = mongoose.model("movies", moviesSchema)