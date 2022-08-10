const subsMongo = require('../DALs/subsMongo')


function getSubs() {
    return new Promise((resolve, reject) => {
        subsMongo.find({}, (err, data) => {
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

function getSubByID(id){
    return new Promise ((resolve, reject) => {
        subsMongo.findById(id, (err, data) => {
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

function getSubByMemberID(id){
    return new Promise ((resolve, reject) => {
        subsMongo.find({MemberID : id}, (err, data) => {
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}



function createSub(obj){
    return new Promise ((resolve, reject) => {
        var today = new Date();
        console.log("createSub")
        
        //var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        //console.log(obj)
        console.log(obj)
        let sub = new subsMongo({
			MemberID : obj.MemberID,
			Movies : obj.Movies
        })
        console.log(sub)
        //console.log(sub)
        sub.save((err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("sub was creted!")
            }
        })
    })
}

function deleteSub(id){
    return new Promise ((resolve, reject) => {
        subsMongo.findByIdAndDelete(id,(err) =>{
            if(err){
                reject(err)
            }
            else{
                resolve("sub was deleted!")
            }
        })
    })
}

function deleteSubByMemberId(id){
    return new Promise ((resolve, reject) => {
        subsMongo.findOneAndDelete({MemberID: id},(err) =>{
            if(err){
                reject(err)
            }
            else{
                resolve("sub was deleted!")
            }
        })
    })
}



function addMovie2sub(id, Movie){
    console.log("addMovie2sub")
    return new Promise ((resolve, reject) => {
        subsMongo.findOneAndUpdate({_id: id},{

			$push: {Movies: Movie} 
        },
        (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("Movie was added to sub!")
            }
        })
    })
}

function deleteMovieFromSub(id, movieId){
    return new Promise ((resolve, reject) => {
        subsMongo.findOneAndUpdate({MemberID: id},{
			$pull: {Movies: {movieId: movieId}} 
        },
        (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("Movie was deleted from sub!")
            }
        })
    })
}

module.exports = {deleteSubByMemberId,deleteMovieFromSub,addMovie2sub,getSubByMemberID,deleteSub,createSub,getSubByID,getSubs}