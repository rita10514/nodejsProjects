var APIDAL = require("../DALs/APIDAL");
var jsonNMDAL = require("../DALs/jsonNMDAL");

async function addNewMovie(newMovie) {
    let data = await jsonNMDAL.getNMData()
    let movies = data.movies
    let movie = {}
    let moviesLen = movies.length
    if(moviesLen == 0) {
        let apiData = await  APIDAL.getMoviesData()
        let apiLastId = apiData.data[apiData.data.length-1].id
    
        movie.id = apiLastId + 1
    }
    else{
        
        movie.id = movies[moviesLen-1].id + 1
    }
    movie.name = newMovie.name
    movie.language = newMovie.language
    movie.premiered = newMovie.premiered

    let string = JSON.stringify(newMovie);
    let objectValue = JSON.parse(string);
    genres = objectValue['genres[]']
    if(!Array.isArray(genres)) {
        genres = [genres]
    }
    movie.genres = genres
    console.log(movie.name,movie.genres)
    movies.push(movie)
    jsonNMDAL.write({movies: movies})
}

async function getData(){
    let apiData = await APIDAL.getMoviesData()
    let jsonData = await jsonNMDAL.getNMData()
    let apiMovies = apiData.data
    let jsonMovies = jsonData.movies
    let allData = apiMovies.concat(jsonMovies)
    return allData
}

async function searchBy(data){
    let result = await getData()

    if(data.name != ""){
        result = result.filter(x => x.name.toLowerCase().includes(data.name.toLowerCase()))
    }
    if(data.genre != "All"){
        result = result.filter(x => x.genres.includes(data.genre))
    }
    if(data.language != "All"){
        result = result.filter(x => x.language == data.language)
       
    }
    //console.log(result)
    return result
}



//addNewMovie(obj)
module.exports = {addNewMovie,searchBy,getData}