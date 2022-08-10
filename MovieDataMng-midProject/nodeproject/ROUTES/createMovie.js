var express = require('express');
var router = express.Router();
var movieBL = require('../moduls/movieBL')
var sessionManag = require('../moduls/sessionManag')

router.get('/', function(req, res, next) {
  let session = req.session
    console.log("createMovie.js - /")
    if(session.authenticated){
      res.render('createMovieP');  
    }
    else{
      res.redirect("/login")
    }
    
});

router.post('/createMovieData', function(req, res, next) {
  console.log("createMovie.js - /createMovieData")
  console.log("after getCreditsLeft")

    movieBL.addNewMovie(req.body)
    console.log(req.session.transLeft)
    if(sessionManag.hasPermission(req.session)){
      req.session.transLeft = sessionManag.getTransLeft(req.session)
      res.redirect('/menu');
    }
    else{
      res.redirect("/login")
    }
  });

  module.exports = router