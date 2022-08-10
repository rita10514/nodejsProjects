var express = require('express');
var router = express.Router();
var loginBL = require('../moduls/loginBL')
var usersBL = require('../moduls/usersBL');
global.loginMsg = ""
global.refresh = true

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("login.js- / ")
  if(req.session.authenticated){
    let id = req.session.userId 
    let transLeft = req.session.transLeft
    if(transLeft == 0){
      loginMsg = "no credits left, please come back tommorow"
      refresh = false
    }
    let temp = await usersBL.updateTrans(id, transLeft)
    req.session.destroy((err) => {
    if(err) throw err
    //res.redirect("/")
  })}
  else if(refresh){
    loginMsg = ""
  }
  refresh = true
  res.render('loginP', {loginMsg});
});

router.get("/logout", function(req, res, next) {
  console.log("login.js- /logout ")
  let id = req.session.userId 
  let transLeft = req.session.transLeft
  usersBL.updateTrans(id, transLeft)
  req.session.destroy((err) => {
    if(err) throw err
    res.redirect("/")
  })
})

router.post("/userData" ,async (req, res) => {
  console.log("login.js- /userData ")
  let usename = req.body.username
  let psw = req.body.psw 
  let loginData = await loginBL.getLoginData(usename, psw)
  let valid = loginData.valid

  if(valid){
    req.session["authenticated"] = true
    req.session["transLeft"] = loginData.transLeft
    req.session["userId"] = loginData.id
    let admin = loginData.admin
    if(admin) {req.session["admin"] = true}
    else{req.session["admin"] = false}
    //req.session.save()
    loginMsg = ""
    res.redirect("/menu")
  }
  else{
    loginMsg = "user name or password is incorrect"
    refresh = false
    res.redirect("/") 
  }
  //{msg : "user name or password is incorrect"}
})


module.exports = router;
