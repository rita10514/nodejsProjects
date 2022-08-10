const axios = require('axios')

const getMoviesWS = () => {
    return axios.get("https://api.tvmaze.com/shows")
}

module.exports = {getMoviesWS}