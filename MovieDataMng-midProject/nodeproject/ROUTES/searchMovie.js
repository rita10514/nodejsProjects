var express = require('express');
var router = express.Router();
var movieBL = require('../moduls/movieBL')
var sessionManag = require('../moduls/sessionManag')

router.get('/', function(req, res, next) {
    console.log("searchMovie.js - /")
    let session = req.session
    if(session.authenticated){
      res.render('searchMovieP');
    }
    else{
      res.redirect("/login")
    }
  });

router.post("/searchMovieData", async function(req, res, next) {
  console.log("searchMovie.js - /searchMovieData")
  let searchParam = req.body
  let result = await movieBL.searchBy(searchParam)
  let allData = await movieBL.getData()
  let len = allData.length-1
  result = result.sort(function(a, b){
      var x = a["premiered"]; var y = b["premiered"] 
      return ((x > y) ? -1 : ((x < y) ? 1 : 0))
  })
  result = result.slice(0,10)

 // console.log(result) 
  
  if(sessionManag.hasPermission(req.session)){
    req.session.transLeft = sessionManag.getTransLeft(req.session)
    res.render('searchResultp',{result, allData, searchParam, len})
  }
  else{
    res.redirect("/login")
  }

}) 

router.get("/:id", async function(req, res, next) {
  console.log("searchMovie.js - /:id")
  let id = req.params.id
  let allData = await movieBL.getData()
  let movieById = allData.find(x => x.id == id) 
  res.render('searchResultDataP',{movieById})
}) 

  module.exports = router