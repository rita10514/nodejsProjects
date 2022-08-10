const axios = require('axios')

const getMembersWS = () => {
    return axios.get("https://jsonplaceholder.typicode.com/users")
}

module.exports = {getMembersWS}