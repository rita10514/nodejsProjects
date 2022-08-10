var jsonUDAL = require("../DALs/jsonUDAL")

async function getLoginData (username, password) {
    let data = await jsonUDAL.getUData()
    let userData = data.users.find(x => x.username == username && x.psw == password)
    
    if(userData != undefined) {
        return {"valid" : true, "admin" :userData.admin, "transLeft" : userData.transLeft, "id" : userData.id }
    }
    else{
        return {"valid" : false}
    }
}


//isValid("mo0nligh","123").then(x => console.log(x))
module.exports = {getLoginData}