const jFile = require('jsonfile')

function getUsers() {
    return new Promise(function (resolve, reject) {
        jFile.readFile('../cinema/data/users.json' ,(err, data) => {
            if(err) {
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

function write2Users(user){
    return new Promise(function (resolve, reject) {
        jFile.writeFile('../cinema/data/users.json',user,(err) => {
            if(err) {
                reject(err)
            }
            else{
                resolve("user was added to json file")
            }
        })
    })
}

module.exports = {getUsers,write2Users}