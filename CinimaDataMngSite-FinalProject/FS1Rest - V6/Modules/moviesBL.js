const moviesMongo = require('../DALs/moviesMongo')
const moviesWS = require('../DALs/moviesWS')

async function initiateMovies() {
    let movies = await moviesWS.getMoviesWS()
    let moviesData = movies.data
        moviesData.forEach(x => {
            let movie = new moviesMongo({
                Name: x.name,
                Genres: x.genres,
                Image: x.image.original,
                Premiered: x.premiered
            })
    
            movie.save((err) => {
                if(err){
                    console.log("failed to initiate a movie")
                }
               else {
                    console.log("new movie was initiated! ")
                }
            })
        })
    
}

function getMovies() {
    return new Promise((resolve, reject) => {
        moviesMongo.find({}, (err, data) => {
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

function getMovieById(id){
    return new Promise ((resolve, reject) => {
        moviesMongo.findById(id, (err, data) => {
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

function createMovie(obj){
    return new Promise ((resolve, reject) => {
        let movie = new moviesMongo({
            Name : obj.Name,
            Genres : obj.Genres,
            Image : obj.Image,
            Premiered : obj.Premiered
        })
        movie.save((err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("movie was creted!")
            }
        })
    })
}

function deleteMovie(id){
    return new Promise ((resolve, reject) => {
        moviesMongo.findByIdAndDelete(id,(err) =>{
            if(err){
                reject(err)
            }
            else{
                resolve("movie was deleted!")
            }
        })
    })
}

function updateMovie(id, obj){
    return new Promise ((resolve, reject) => {
        moviesMongo.findByIdAndUpdate(id,{
            Name : obj.Name,
            Genres : obj.Genres,
            Image : obj.Image,
            Premiered : obj.Premiered
        },
        (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("movie was updated!")
            }
        })
    })
}

module.exports = {initiateMovies,updateMovie,deleteMovie,createMovie,getMovieById,getMovies}
