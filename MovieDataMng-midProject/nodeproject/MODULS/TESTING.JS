var APIDAL = require("../DALs/APIDAL");
var jsonNMDAL = require("../DALs/jsonNMDAL");
var movieBL = require("../moduls/movieBL");

async function test(){
    let apiData =  await APIDAL.getMoviesData()
    let jsonData =  await jsonNMDAL.getNMData()
    let allData = await movieBL.getData()

    let moviesBygenres = allData.filter(x=> x.genres.includes("Drama")) 
    moviesBygenres.forEach(movie => { 
            console.log(movie.name ) 
    })

    //let apiMovies = apiData.data.filter(x => x.name.toLowerCase().includes("Bit".toLowerCase()))
   // let jsonMovies = jsonData.movies.filter(x => x.genres.includes("fantasy"))

   // console.log(jsonData)
   // console.log(jsonMovies)
}

test()