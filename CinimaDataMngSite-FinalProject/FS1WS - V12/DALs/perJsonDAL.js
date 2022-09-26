const jFile = require('jsonfile')

function getPers() {
    return new Promise(function (resolve, reject) {
        jFile.readFile('./data/permissions.json' ,(err, data) => {
            if(err) {
                reject(err)
            }
            else{

                resolve(data)
            }
        })
    })
}

function write2Per(user){
    return new Promise(function (resolve, reject) {
        jFile.writeFile('./data/permissions.json',user,(err) => {
            if(err) {
                reject(err)
            }
            else{
                resolve("per was added to json file")
            }
        })
    })
}

module.exports = {getPers, write2Per}