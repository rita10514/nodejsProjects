var express = require('express');
var router = express.Router();
const subsWSDAL = require("../DALs/subsWSDAL")
const subsBL = require("../modules/subsBL")
const loginBL = require('../modules/loginBL')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined){
    let HelloUser = loginData[0]
    let per = loginData[1]
    if(per.includes("View Subscriptions")){
      let members = await subsBL.getSubsAndMembersData()
      let movies = await subsWSDAL.getMoviessWS()
      let allMovies = movies.data
      res.render('members' , {members, allMovies, HelloUser,per});
    }
    else{
      res.redirect('/menu')
    }
  }
  else{
    res.redirect("/")
  }
});

router.get('/item/:id', async function(req, res, next) {
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined){
    let id = req.params.id
    let members = await subsBL.getSubsAndMembersData()
    let movies = await subsWSDAL.getMoviessWS()
    let allMovies = movies.data
    let membersFilter = members.filter(m => m.id === id)
    
    let HelloUser = loginData[0]
    let per = loginData[1]
    res.render('members' , {members : membersFilter , allMovies, HelloUser,per});
  }
  else{
    res.redirect("/")
  }
});

router.get('/addMember', async function(req, res, next) {
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined){
    let HelloUser = loginData[0]
    let per = loginData[1]
    res.render('addMember', {HelloUser,per});
  }
  else{
    res.redirect("/")
  }
  });

router.post('/saveMember', async function(req, res, next) {
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined){
    let member = req.body
    subsWSDAL.addMemberWS(member).then(res.redirect("/subs"))
  }
  else{
    res.redirect("/")
  }
});

router.get('/deleteSub/:id', async function(req, res, next) {
  console.log("deleteSub")
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined){
    let id = req.params.id
    subsWSDAL.deleteMemberWS(id)
    subsWSDAL.deleteSubByMemberIdWS(id).then (() => res.redirect("/subs"))
  }
  else{
    res.redirect("/")
  }
});


router.post('/update/:id', async function(req, res, next) {
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined){
    let id = req.params.id;
    let member = req.body
    subsWSDAL.updateMemberWS(id,member).then(res.redirect("/subs"))
  }
  else{
    res.redirect("/")
  }
});

router.get('/editSub/:id', async function(req, res, next) {
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined){
    let id = req.params.id;
    let member = await subsWSDAL.getMemberWS(id)
    let memberData = member.data
    
    let HelloUser = loginData[0]
    let per = loginData[1]
    res.render('editMember' , { member : memberData,  HelloUser,per});
  }
  else{
    res.redirect("/")
  }
});



router.post('/addMovie2sub/:id', async function(req, res, next) {
  console.log('/addMovie2sub/:id')
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined){
    let id = req.params.id
    
    let movie = {"movieId" : req.body.movieId , "date" : req.body.date}
    
    subsBL.addMovie2Sub(id,movie).then(res.redirect("/subs"))
  }
  else{
    res.redirect("/")
  }
  
  
});
module.exports = router;




