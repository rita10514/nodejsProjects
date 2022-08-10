const subsWSDAL = require("../DALs/subsWSDAL")

function getCuctomSubs(subs,members,movieId){
    let customSub = {}
    let customSubs = []

    subs.forEach(s => {
        s.Movies.forEach(m => {
            if(m.movieId == movieId){
                let member = members.find(mem => mem._id.toString() == s.MemberID.toString())
                
                customSub = {
                    "id" : member._id,
                    "Name" : member.Name,
                    "date" : m.date
                }
                //console.log(customSub)
                customSubs.push(customSub)  
            }
        })
    })
    return customSubs
}


async function getMoviesData(){
    let movies = await subsWSDAL.getMoviessWS()
    let moviesData = movies.data
    let subs =  await subsWSDAL.getSubsWS()
    let subsData = subs.data
    let members = await subsWSDAL.getMembersWS()
    let membersData = members.data

    let customMovies = []
    let customMovie = {}
    
    moviesData.forEach( x => {
        
        //console.log(x._id)
        //let subs = subsData.filter(sub => sub.Movies.find(movie => movie.movieId == x._id) != undefined)
        //console.log(subs.Movies)
        customMovie = {
            "id" : x._id,
            "Name" : x.Name,
            "Premiered" : x.Premiered,
            "Image" : x.Image,
            "Genres" : x.Genres,
            "Subs" : getCuctomSubs(subsData,membersData,x._id)
        }
        customMovies.push(customMovie)
    })
    //console.log(customMovies)
    return customMovies    

}

async function getAllGenres() {
    let movies = await subsWSDAL.getMoviessWS()
    let moviesData = movies.data
    let genres = []
    moviesData.forEach(x=> {
        genres = genres.concat(x.Genres)
    })
   genres = [...new Set(genres)]
   return genres
}

function includesSubString(element,value){   
    if (element.toLowerCase().includes(value.toLowerCase())) 
        return true     
}

async function fillterMovies(by,value){
    let moviesData = await getMoviesData()
    //console.log(moviesData[0].Subs.map(x => x.Name))
    //console.log(moviesData)

    let filteredList = []
    switch(by){
        case "All" :
            //console.log("all")
            filteredList = moviesData
            break
        case "Genres" :
            filteredList = moviesData.filter(x => x.Genres.find(element => includesSubString(element,value)))
            break
        case "Movie Name" : 
            filteredList = moviesData.filter(x => x.Name.toLowerCase().includes(value.toLowerCase()))
            break
        case "Year" :
            filteredList = moviesData.filter(x => x.Premiered.split("-")[0] === value)
            break
        case "Subscriber Name" :
            filteredList = moviesData.filter(x => x.Subs.map(x => x.Name.toLowerCase()).find(element => includesSubString(element,value)))
            break   
    }
    //console.log(filteredList)
    return filteredList    
}


async function sortMovies(filteredList,by,order){ 
    let sortedList = []
    switch(by){
        case "Movie Name" : 
            sortedList = filteredList.sort((a, b) => a.Name.localeCompare(b.Name))
            if(order=="dec") sortedList = sortedList.reverse()
            break 
        case "Premiered Date" :
            sortedList = filteredList.sort((a, b) => a.Premiered.localeCompare(b.Premiered))
            if(order=="dec") sortedList = sortedList.reverse()
            break      
    }
    return sortedList
}

async function searchResults(filterBy,filterValue,sortBy,reverse){
    let filteredList = await fillterMovies(filterBy,filterValue)
    let sortedList = await sortMovies(filteredList,sortBy,reverse)

    //console.log(sortedList.filter(x => x.Subs.length != 0))
    return sortedList
}


//searchResults("Genre","Drama","Subscriber Name", true)

module.exports = {getMoviesData,searchResults}