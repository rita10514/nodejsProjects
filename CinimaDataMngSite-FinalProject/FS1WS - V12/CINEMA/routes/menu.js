var express = require('express');
var router = express.Router();
const loginBL = require('../modules/loginBL')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined){
    let HelloUser = loginData[0]
    let per = loginData[1]
    res.render('home',{HelloUser, per});
  }
  else{
    res.redirect("/")
  }
    
});

router.get('/movies', function(req, res, next) {
  console.log('menu -> /movies')
    res.redirect('/movies');
});


router.get('/subs', function(req, res, next) {
  res.redirect('/subs');
});

router.get('/userMng', function(req, res, next) {
  res.redirect('/userMng');
});

router.post('/logOut', function(req, res, next) {
  res.redirect("/")
});

module.exports = router;
