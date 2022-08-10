var axios = require("axios")

function getMoviesData(){
    return axios.get("https://api.tvmaze.com/shows")
}
//getMoviesData().then(x => console.log(x.filter(x => x.id == 1)))
module.exports = {getMoviesData}