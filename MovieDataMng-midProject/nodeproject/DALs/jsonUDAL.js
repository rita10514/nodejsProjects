var jsonF = require('jsonfile')

function getUData(){
    return new Promise ((resolve,reject) =>{
        jsonF.readFile("./data/Users.json" , (err, data) =>{
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
    return new Promise ((resolve,reject) =>{
        jsonF.writeFile("./data/Users.json",obj, (err) =>{
            if(err){
                reject(err)
            }
        })
    })
}
//getUData().then((data) => console.log(data.users))
module.exports = {getUData,write}