var express = require('express');
var router = express.Router();
var movieBL = require('../moduls/movieBL')
var sessionManag = require('../moduls/sessionManag')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("menu.js - /")
  let session = req.session

    res.render('menuP' ,{"admin": session.admin});
  
});

router.get('/createMovieM', function(req, res, next) {
  console.log("menu.js - /createMovie")
  res.redirect('/createMovie');
});

router.get('/searchMovieM', function(req, res, next) {
  console.log("menu.js - /searchMovie")
  res.redirect('/searchMovie');
});

router.get('/editUsersM', function(req, res, next) {
  console.log("menu.js - /editUsers")
  res.redirect('/editUsers');
});


module.exports = router;
