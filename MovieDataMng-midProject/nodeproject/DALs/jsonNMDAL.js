var jsonF = require('jsonfile')


function getNMData(){
    return new Promise ((resolve,reject) =>{
        jsonF.readFile("./data/NewMovies.json" , (err, data) => {
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            } 
        })
    })
}

function write(obj){
    jsonF.writeFile("./data/NewMovies.json",obj,(err)=> {
        if(err){console.log(err)}
    })
}
//getNMData().then((data) => console.log(data.movies))

//write({obj})
module.exports = {getNMData,write}