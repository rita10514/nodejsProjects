const axios = require('axios')

const getSubsWS = () => {
    return axios.get("http://localhost:8000/api/subs")
}

const getMoviessWS = () => {
    return axios.get("http://localhost:8000/api/movies")
}

const getMembersWS = () => {
    return axios.get("http://localhost:8000/api/members")
}

const getMemberWS = (id) => {
    return axios.get("http://localhost:8000/api/members/" + id)
}

const getMovieWS = (id) => {
    return axios.get("http://localhost:8000/api/movies/" + id)
}

const getSubByMemberIDWS = (id) => {
    return axios.get("http://localhost:8000/api/subs/" + id)
}

const addMovie2sub = (id,movie) => {
    
    return axios.put("http://localhost:8000/api/subs/addMovie2sub/" + id, movie)
}

const addMemberWS = (obj) => {
    
    return axios.post("http://localhost:8000/api/members", obj)
}
const addMovieWS = (obj) => {
    return axios.post("http://localhost:8000/api/movies", obj)
}

const addSubWS = (obj) => {
    
    return axios.post("http://localhost:8000/api/subs/", obj)
}

const deleteSubWS = (id) => {
    return axios.delete("http://localhost:8000/api/subs/" + id)
}

const deleteSubByMemberIdWS = (id) => {
    return axios.delete("http://localhost:8000/api/subs/deleteSubByMemberId/" + id)
}

const deleteMovieWS = (id) => {
    return axios.delete("http://localhost:8000/api/movies/" + id)
}

const deleteMemberWS = (id) => {
    return axios.delete("http://localhost:8000/api/members/" + id)
}

const updateMemberWS = (id, obj) => {
    return axios.put("http://localhost:8000/api/members/" + id, obj)
}

const updateMovieWS = (id, obj) => {
    //console.log(id, obj)
    return axios.put("http://localhost:8000/api/movies/" + id, obj)
}

const updateSubWS = (id, obj) => {
    return axios.put("http://localhost:8000/api/subs/" + id , obj)
}


module.exports = {getMovieWS,deleteSubByMemberIdWS,addMovie2sub,getSubByMemberIDWS,getMemberWS,updateMemberWS,updateSubWS,updateMovieWS,getSubsWS,getMoviessWS,getMembersWS,addMemberWS, addMovieWS,addSubWS,deleteSubWS,deleteMovieWS,deleteMemberWS}