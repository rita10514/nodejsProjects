var express = require('express');
var router = express.Router();
var usersBL = require("../moduls/usersBL")

router.get('/', async function(req, res, next) {
  console.log("editUsers.js - /")
  if(req.session.authenticated && req.session.admin){
  let users = await usersBL.getUsers()
    res.render('editUsersP', {users});
  }
  else if(req.session.authenticated){
    res.redirect("/menu")
  }
  else{res.redirect("/login")}
});

router.get("/addNewUser" ,(req, res) => {
  console.log("editUsers.js - /addNewUser")
  if(req.session.authenticated && req.session.admin){
    let user = {"username" : "","psw" : "","numOfTransactions": ""} //empty user to avoid error
    res.render('addNewUserP' ,{title: 'Add New User' , user})
  }
  else if(req.session.authenticated){
    res.redirect("/menu")
  }
  else{res.redirect("/login")}
} )

router.post("/addNewUserData", (req, res) => {
  console.log("editUsers.js - /addNewUserData")
    if(req.session.authenticated && req.session.admin){
      let psw = req.body.psw
      let username = req.body.username
      let numOfTransactions = parseInt(req.body.numOfTransactions)
      let transLeft = numOfTransactions
      let dataNoTransLeft = ""
      let admin = (req.body.admin == "on") ? true : false
      let newUser = {username , psw , numOfTransactions, admin, transLeft, dataNoTransLeft}
      usersBL.addUser(newUser)
      res.redirect("/editUsers")
    }
    else if(req.session.authenticated){
      res.redirect("/menu")
    }
    else{res.redirect("/login")}
  
})

router.get("/update/:id", async (req, res) => {
  if(req.session.authenticated && req.session.admin){
    console.log("editUsers.js - /update/:id")
    let id = req.params.id
    let user = await usersBL.getUser(id)
    res.render('addNewUserP',{title: 'Update User', "user" : user})
  }
  else if(req.session.authenticated){
    res.redirect("/menu")
  }
  else{res.redirect("/login")}
})

router.post("/updateData/:id", async (req, res) => {
  if(req.session.authenticated && req.session.admin){
    console.log("editUsers.js - /update/:id(post)")
    let id = req.params.id
    usersBL.updateUser(id,req.body)
    res.redirect('/editUsers')
  }
  else if(req.session.authenticated){
    res.redirect("/menu")
  }
  else{res.redirect("/login")}
})

router.get("/delete/:id", (req, res) => {
  
  if(req.session.authenticated && req.session.admin){
    let id = req.params.id
    console.log("editUsers.js - /delete/:id")
    usersBL.deleteUser(id)
    res.redirect('/editUsers')
  }
  else if(req.session.authenticated){
    res.redirect("/menu")
  }
  else{res.redirect("/login")}
})


module.exports = router