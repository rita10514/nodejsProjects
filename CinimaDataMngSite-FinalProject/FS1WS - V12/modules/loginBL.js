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
    if(session.authenticated){
        let HelloUser = session.userName
        let userId = session.userId

        return [HelloUser , permissions, userId]
    }

    return undefined
    
}

module.exports = {getLoginData, getSessionData}