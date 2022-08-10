const membersMongo = require('../DALs/membersMongo')
const membersWS = require('../DALs/membersWS')

async function initiateMembers() {
    let members = await membersWS.getMembersWS()
    let membersData = members.data
        membersData.forEach(m =>{
            let member = new membersMongo ({
                Name : m.name,
                Email : m.email,
                City : m.address.city
            })
    
            member.save((err) => {
                if(err){
                    console.log("failed to initiate a member")
                }
               else {
                    console.log("new member was initiated! ")
                }
            })
    
        })
    

}

function getMembers() {
    return new Promise((resolve, reject) => {
        membersMongo.find({}, (err, members) =>{
            if(err){
                reject(err)
            }
            else{
                resolve(members)
            }
        })
    })
}

function getMemberbyId(id){
    return new Promise ((resolve, reject) => {
        membersMongo.findById(id , (err, data) => {
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }  
        })
    })
}

function createMember(obj) {
    console.log("createMember")
    return new Promise ((resolve, reject) => {
        let member = new membersMongo ({
            Name : obj.Name,
            Email : obj.Email,
            City : obj.City
        })
        member.save((err) =>{
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('member was created')
            }
        })
    })
}

function updateMember(id, obj) {
    return new Promise ((resolve, reject) => {
        membersMongo.findByIdAndUpdate(id , {
            Name : obj.Name,
            Email : obj.Email,
            City : obj.City
        } 
        ,(err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("member was updated")
            }  
        })
    })
}

function deleteMember(id) {
    return new Promise ((resolve, reject) => {
        membersMongo.findByIdAndDelete(id ,(err, data) => {
            if(err){
                reject(err)
            }
            else{
                resolve("member was deleted")
            }  
        })
    })
}




module.exports = {initiateMembers,getMembers,createMember,getMemberbyId,updateMember,deleteMember}