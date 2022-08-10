var express = require('express');
var router = express.Router();
const usersBL = require('../modules/usersBL')
const loginBL = require('../modules/loginBL')

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("/userMng")
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined ){
    let HelloUser = loginData[0]
    let per = loginData[1]
    if(per.includes("Manage Users")){
      let users = await usersBL.getUsersData()
      res.render('users' , {users,HelloUser,per});
    }
    else{
      res.redirect("/menu")
    }   
  }
});

router.get('/addUser', async function(req, res, next) {
  console.log("userMng -> /addUser")
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined ){
    let HelloUser = loginData[0]
    let per = loginData[1]
    if(per.includes("Manage Users")){
      res.render('addUser', {HelloUser,per});
    }
  }
  else{
    res.redirect("/menu")
  } 
});
router.post('/saveUser', async function(req, res, next) {//save new user
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined ){
      let user = req.body
      let currentUserid = req.session.cookie.userId
      usersBL.saveUser(user,currentUserid).then (() => {
        res.redirect("/userMng")
    })
  }
  else{
    res.redirect("/menu")
  } 
  
});

router.get('/editUser/:id', async function(req, res, next) {
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined ){
    let HelloUser = loginData[0]
    let per = loginData[1]
    if(per.includes("Manage Users")){
      let id = req.params.id
      let user = await usersBL.getUserData(id)
      
      res.render('editUser' ,{user,id, HelloUser,per});
    }
    
  }
  else{
    res.redirect("/")
  }
});

router.post('/update/:id', async function(req, res, next) {
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined ){
    let action = req.body.action;
    if(action == 'save'){
      let id = req.params.id
      let user = req.body
      let currentUserid = req.session.userId

      usersBL.updateUser(id,user,currentUserid).then (() =>{
          res.redirect("/userMng")
        })
    }
    else{
      res.redirect("/userMng")
    }
  }
  else{
    res.redirect("/")
  }
 
});


router.get('/deleteUser/:id', async function(req, res, next) {
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined ){
    let id = req.params.id
    usersBL.deleteUser(id).then (() => res.redirect("/userMng"))
  }
  else{
    res.redirect("/")
  }
});

module.exports = router;




