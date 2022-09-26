const userJsonDAL = require('../DALs/userJsonDAL')
const perJsonDAL = require('../DALs/perJsonDAL')
const usersMongo = require('../DALs/usersMongo')

function getUsersDataDB(){
    return new Promise ((resolve, reject) => {
        usersMongo.find({} , (err, users) => {
            if(err) {
                reject(err)
            }
            else{
                resolve(users)
            }
        })
    })
}

function doesUserNameExists(userName){
    return new Promise ((resolve, reject) => {
        usersMongo.exists({userName : userName} , (err, ans) => {
            if(err) {
                reject(err)
            }
            else{
                resolve(ans)
            }
        })
    })
}

function addpsw(userName,psw){
    return new Promise( (resolve, reject) => { 
        usersMongo.findOneAndUpdate({userName : userName},{psw : psw},(err)=>{ 
                if(err){reject(err)}
                else{ resolve("password updated")}
        })
    })
}


function getUserData(id){ // to present all users in the user mng page
    return new Promise ((resolve, reject) => {
        usersMongo.find({_id : id} , async (err, userM) => {
            if(err) {
                reject(err)
            }
            else{
               
                let users = await userJsonDAL.getUsers()
                let usersData = users.users

                let pers = await perJsonDAL.getPers()
                let persData = pers.Permissions
                let userData = usersData.find(x => x.id == id)
                let perData = persData.find(x => x.id == id)
              
                let customUserData = {
                    fName : userData.fName,
                    lName : userData.lName,
                    UserName : userM[0].userName,
                    SessionTimeOut : userData.SessionTimeOut,
                    CreatedData : userData.Created_date,
                    Permissions :perData.Permissions
                }
      
                resolve(customUserData)
            }
        })
    })
}



function getUserDataByUserName(userName){  //for login
    return new Promise ((resolve, reject) => {
        usersMongo.find({userName : userName} , async (err, userM) => {
            if(err) {
                reject(err)
            }
            else{
                if(userM.length == 0) resolve("invalid")
                //console.log("getUserDataByUserName")
                let users = await userJsonDAL.getUsers()
                let usersData = users.users

                let pers = await perJsonDAL.getPers()
                let persData = pers.Permissions
                //console.log(userM)
                let userData = usersData.find(x => x.id == userM[0]._id)
                let perData = persData.find(x => x.id == userM[0]._id)
                let customUserData = {
                    id: userM[0]._id,
                    userName : userM[0].userName,
                    psw : userM[0].psw,
                    SessionTimeOut : userData.SessionTimeOut,
                    CreatedData : userData.Created_date,
                    Permissions :perData.Permissions  
                }
      
                resolve(customUserData)
            }
        })
    })
}

async function getUsersData(){
    
    let usersJ = await userJsonDAL.getUsers()
    let usersJData = usersJ.users

    let perJ = await perJsonDAL.getPers()
   
    let perJData = perJ.Permissions

    let usersM = await getUsersDataDB()

    let customUserData = {}
    let usersList = []

    usersJData.forEach(user => {
        let id = user.id
        let userM = usersM.find(x => x._id == id)
        let per = perJData.find(x => x.id == id)
        customUserData = {
            id : id,
            fName : user.fName,
            lName : user.lName,
            UserName : userM.userName,
            SessionTimeOut : user.SessionTimeOut,
            CreatedData : user.Created_date,
            Permissions :per.Permissions
        }
        usersList.push(customUserData)
    })
    
    return usersList
    
}

function createUserMongo(user){
    return new Promise((resolve, reject) => {
        let newUser = new usersMongo({
            "userName": user.userName,
            "psw" : ""
        })
        newUser.save((err,user) => {
            if(err){
                reject(err)
            }
            else{
                resolve(user.id)
            }
        })
    })
}


async function addUserJson(id,user){
    let users = await userJsonDAL.getUsers()
    let usersData = users.users
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    let newUser = {
        "id" : id,
        "fName" : user.fName,
        "lName" : user.lName,
        "Created_date" : date,
        "SessionTimeOut" : user.sess
    }
    usersData.push(newUser)
    
    userJsonDAL.write2Users({users: usersData})
}

async function addPerJson(id,user){
    let pers = await perJsonDAL.getPers()
    let persData = pers.Permissions
    
    let perList = user.Permissions
    if(!Array.isArray(perList)){
        perList = [user.Permissions]
    }
    let newPer = {
        "id" : id,
        "Permissions" : perList
    }
    persData.push(newPer)
    perJsonDAL.write2Per({Permissions : persData})
}

async function saveUser(user,currentUser){
    let id = await createUserMongo(user)
    addUserJson(id,user)
    addPerJson(id,user)
}

async function updateUserJson(id,updatedUser){
    let usersJ = await userJsonDAL.getUsers()
    let usersJData = usersJ.users
    let userIndex = usersJData.findIndex(x => x.id == id)
    let user = usersJData.find(x => x.id == id)
    //console.log(updatedUser)
    usersJData[userIndex] = {
        "id": id,
        "fName": updatedUser.fName,
        "lName": updatedUser.lName,
        "Created_date": user.Created_date,
        "SessionTimeOut":updatedUser.sess
    }
    userJsonDAL.write2Users({users: usersJData})
}

async function updatePerJson(id,user){
    let persJ = await perJsonDAL.getPers()
    let persJData = persJ.Permissions
    let perIndex = persJData.findIndex(x => x.id == id)

    let perList = []
    if(Array.isArray(user.Permissions)){
        perList = user.Permissions
    }
    else{
        perList.push(user.Permissions)
    }

    persJData[perIndex] = {
        "id": id,
        "Permissions" : perList
    }
    
    perJsonDAL.write2Per({Permissions: persJData})
}

async function updateUser(id, user){
    return new Promise( (resolve, reject) => { 
        usersMongo.findByIdAndUpdate(id,
            {"userName" : user.userName}, (err)=>{ 
            if(err){
                reject(err)
            }
            else{
                updateUserJson(id,user)
                updatePerJson(id,user)
                
                resolve("user data updated")
            }
        })
    })

}

function deleteUser(id){
    return new Promise((resolve, reject) => {
        usersMongo.findByIdAndDelete(id, (err) => {
            if(err){
                reject(err)
            }
            else{
                deleteUserJ(id)
                deletePerJ(id)
                resolve("user data was deleted")
            }
        })
    })
}

async function deleteUserJ(id){
    let user = await userJsonDAL.getUsers()
    let userData = user.users
    let index = userData.findIndex( x=> x.id == id)
    userData.splice(index,1)

    userJsonDAL.write2Users({users: userData})

}

async function deletePerJ(id){
    let per = await perJsonDAL.getPers()
    let perData = per.Permissions
    let index = perData.findIndex( x=> x.id == id)
    perData.splice(index,1)

    perJsonDAL.write2Per({Permissions: perData})

}

async function passingAdmin(id){
    let persJ = await perJsonDAL.getPers()
    let persJData = persJ.Permissions
    let perIndex = persJData.findIndex(x => x.id == id)
    let perUser = persJData[perIndex].Permissions
    let indexmng = perUser.findIndex(x => x == "Manage Users")
    perUser.splice(indexmng,1)
    

    persJData[perIndex] = {
        "id": id,
        "Permissions" : perUser
    }
    console.log(persJData)
    
    perJsonDAL.write2Per({Permissions: persJData})

}




module.exports = {addpsw,getUsersData,saveUser, getUserData, updateUser,  deleteUser, getUserDataByUserName, doesUserNameExists}
