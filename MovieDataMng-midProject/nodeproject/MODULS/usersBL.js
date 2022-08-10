var APIDAL = require("../DALs/APIDAL");
var jsonUDAL = require("../DALs/jsonUDAL");

async function getUsers(){
    let data = await jsonUDAL.getUData()
    return data.users
}

async function getUser(id){
    let users = await getUsers()
    let user = users.find(x => x.id == id)
    return user
}

async function addUser(newUser){
    let users = await getUsers()
    let len = users.length
    let id = 1
    if(len > 0){
         id = users[len - 1].id + 1
    }
    newUser.id = id
    newUser.createdDate = today //today is a global variable in app.js


    if(newUser.admin){
        newUser.numOfTransactions = -1 //if admin numOfTransactions is unlimited (-1)
        
    }
    else if(newUser.numOfTransactions == ""){ //if not admin and numOfTransactions wasnt set then set to 10 
        newUser.numOfTransactions = 10
    }
    

    users.push(newUser)
    jsonUDAL.write({"users" : users})
}

async function deleteUser(userId){
    let users = await getUsers()
    users = users.filter(x => x.id != userId)
    jsonUDAL.write({users})
}

async function updateUser(userId,newData){
    let users = await getUsers()
    let index = users.findIndex(x => x.id == userId)
    let user = users[index]
    //console.log(index)
    user.username = newData.username
    user.psw = newData.psw
    user.numOfTransactions = newData.numOfTransactions
    if(!user.admin){
        user.dataNoTransLeft = newData.dataNoTransLeft
        user.transLeft = newData.transLeft
        console.log("transLeft: " + users[index].transLeft)
    }
    console.log(users,userId)
    jsonUDAL.write({users})
    console.log(users,userId)
}

//used only before logout
async function updateTrans(id, transLeft){
    console.log("updateTrans")
    var date = new Date();
    var today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    let user = await getUser(id)
    //console.log(id)
    let dataNoTransLeft = user.dataNoTransLeft
    if(!user.admin){
      if(dataNoTransLeft != "" && dataNoTransLeft != today){
        user.dataNoTransLeft = ""
        user.transLeft = user.numOfTransactions
        console.log("A")
      }
      else{
        user.transLeft =  transLeft
        console.log("B1")
        if(transLeft == 0){
            user.dataNoTransLeft = today
            console.log("B2")
        }
      }
      console.log(user)  
      let temp = await updateUser(id,user)
      user = await getUser(id)
      console.log(user)
      return user.trasnLeft
    }
    return user.numOfTransactions
  }


module.exports = {addUser,getUsers,deleteUser,getUser,updateUser,updateTrans}