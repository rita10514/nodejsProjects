const subsWSDAL = require("../DALs/subsWSDAL")

function convertDate(date){
    let dateSplit = date.split('-')
    let newFormat = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0]
    return newFormat
}

async function createSub(id,firstMovie) {
    let sub = {
        MemberID : id,
        Movies : [{ "movieId" : firstMovie.movieId,
            "date" : firstMovie.date}]
    }
    subsWSDAL.addSubWS(sub)

}



async function addMovie2Sub(id,Movie){
    console.log("addMovie2Sub(id,Movie)");
    let sub = await subsWSDAL.getSubByMemberIDWS(id)
    let subData = sub.data
    let formatedMovie = {
        movieId: Movie.movieId,
        date : convertDate(Movie.date)

    }
    if(subData.length == 0) {
        console.log("createSub");
        createSub(id,formatedMovie)
    }
    else{
        console.log("addMovie2sub");
        let subId = subData[0]._id
        subsWSDAL.addMovie2sub(subId,formatedMovie)
    }
}



async function getSubsAndMembersData(){
    let members = await subsWSDAL.getMembersWS()
    let subs = await subsWSDAL.getSubsWS()
    let membersData = members.data
    let subsData = subs.data
    let customSub = {}
    let customSubs = []

    membersData.forEach(async x => {
        let sub = undefined
        for(let i=0 ; i<subsData.length ; i++){
            if(x._id == subsData[i].MemberID) {
                sub = subsData[i]   
            }
        }
        
        if(sub != undefined){
            
            let movies = await getMoviesById(sub.Movies)
            customSub = {
                id: x._id,
                Name : x.Name,
                City : x.City,
                Email : x.Email,
                Movies : movies
            }
        }
        else{
            customSub = {
                id: x._id,
                Name : x.Name,
                City : x.City,
                Email : x.Email,
                Movies : []
            }
        }
        customSubs.push(customSub)
        //console.log(customSubs)
    })
    return customSubs
}

async function getMoviesById(movieList){
    let allMovies = await subsWSDAL.getMoviessWS()
    let allMoviesData = allMovies.data
    let customMovies = []
    let customMovie = {}
    movieList.forEach( x => {
        
      //let movie = allMoviesData.find(y => {x.movieId == y._id.toString()})
      //console.log(movie) 
        let movie = {}
        for(let i=0 ; i<allMoviesData.length ; i++){
            
            if(x.movieId == allMoviesData[i]._id.toString()) {
                movie = allMoviesData[i] 

            }
        }
        customMovie = {
            "movieId" : x.movieId,
            "Name" : movie.Name,
            "Genres" : movie.Genres,
            "Image" : movie.Image,
            "Date" : x.date
        }

        customMovies.push(customMovie)
    })
   
    return customMovies
}




module.exports = {convertDate,createSub, getSubsAndMembersData, addMovie2Sub}