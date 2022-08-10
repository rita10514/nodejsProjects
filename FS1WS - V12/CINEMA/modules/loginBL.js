const subsWSDAL = require("../modules/usersBL")
const userBL = require("../modules/usersBL")

async function getLoginData (userName, password) {
    console.log("getLoginData")
    let data = await userBL.getUserDataByUserName(userName)
    let valid = false
    if(data != "invalid" && data.psw == password && data.userName == userName) {valid = true}
    
    if(valid) {
        return {"valid" : true, "Permissions" :data.Permissions, "SessionTimeOut" : data.SessionTimeOut, "id" : data.id }
    }
    else{
        return {"valid" : false}
    }
}

async function getSessionData(req){
    let session = req.session
    let permissions = session.Permissions
    //console.log(session)
    if(session.authenticated){
        var HelloUser = session.userName
        return [HelloUser , permissions]
    }

    return undefined
    
}

module.exports = {getLoginData, getSessionData}