var express = require('express');
const usersBL = require("../modules/usersBL")
const loginBL = require("../modules/loginBL")


var router = express.Router();

global.loginMsg = ""
global.refresh = true

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("login.js- / ")
  if(req.session.authenticated){
    let transLeft = req.session.transLeft
    if(transLeft == 0){
      loginMsg = "no credits left, please come back tommorow"
      refresh = false
    }
  }
  else if(refresh){
    loginMsg = ""
  }
  refresh = true
  res.render('login', {loginMsg});
});

router.post("/userData" ,async (req, res) => {
  console.log("login.js- /userData ")

      let userName = req.body.userName
      let psw = req.body.psw 
      let loginData = await loginBL.getLoginData(userName, psw) 
      let valid = loginData.valid
      if(valid){
        req.session["authenticated"] = true
        req.session["Permissions"] = loginData.Permissions
        req.session["userId"] = loginData.id
        req.session.cookie.expires = Number(loginData.SessionTimeOut)*60000
        req.session["userName"] = userName
        
        loginMsg = ""
        res.redirect("/menu")
      }
      else{
        loginMsg = "user name or password is incorrect"
        refresh = false
        res.redirect("/") 
      }
  })
  

router.get('/createAccount', function(req, res, next) {
  
  res.render('createAccount',{msg:""});
});

router.post('/savepsw', async function(req, res, next) {
  let userName = req.body.userName
  let psw = req.body.psw
  let exists = await usersBL.doesUserNameExists(userName)
  if(exists){
    await usersBL.addpsw(userName, psw)
    res.redirect('/');
  }

  else{
    res.render('createAccount',{msg:"user name incorrect"});
  }  
  
});

router.get('/logOut', function(req, res, next) {
  req.session.destroy((err) => {
    if(err) throw err
    res.redirect("/")
  })
});



module.exports = router;
