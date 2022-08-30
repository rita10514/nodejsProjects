var express = require('express');
var router = express.Router();
const moviesBL = require('../modules/moviesBL')
const subsWSDAL = require("../DALs/subsWSDAL")
const loginBL = require('../modules/loginBL')

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log('/movies')
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined  ){
    let HelloUser = loginData[0]
    let per = loginData[1]
    if(per.includes("View Movies")){
      let movies = await moviesBL.getMoviesData()
      let body = {}
      res.render('movies', {movies,body, HelloUser,per});
    }
    else{
      res.redirect("/menu")
    }
  }
  else{
    res.redirect("/")
  }
  
});

router.get('/item/:id', async function(req, res, next) {
  console.log('/movies -> /item/:id')
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined  ){
    let HelloUser = loginData[0]
    let per = loginData[1]
    let id = req.params.id
    let movies = await moviesBL.getMoviesData()
    let moviesFilter = movies.filter(m => m.id == id)
    res.render('movies', {movies : moviesFilter, HelloUser,per});
  }
  else{
    res.redirect("/")
  }
});

router.get('/addMovies',async function(req, res, next) {
  console.log('movies -> /addMovie')
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined  ){
    let HelloUser = loginData[0]
    let per = loginData[1]
    res.render('addMovie', {HelloUser,per});
  }
  else{
    res.redirect("/")
  }
});

router.get('/editMovie/:id', async function(req, res, next) {
  console.log('movies -> /editMovie')
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined  ){
    let HelloUser = loginData[0]
    let per = loginData[1]
    let id = req.params.id
    let movie = await subsWSDAL.getMovieWS(id)
    let movieData = movie.data
    res.render('editMovie', {movie : movieData , add: false, HelloUser,per});
  }
  else{
    res.redirect("/")
  }
});

router.post('/saveMovie', async function(req, res, next) {
  console.log('/movies -> /saveMovie')
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined  ){
    let movie = req.body
    subsWSDAL.addMovieWS(movie).then( res.redirect("/movies"))
  }
  else{
    res.redirect("/")
  }
});

router.post('/updateMovie/:id', async function(req, res, next) {
  console.log('/movies -> /updateMovie/:id')
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined  ){
    let movie = req.body
    let id = req.params.id
    
    subsWSDAL.updateMovieWS(id, movie).then( res.redirect("/movies"))
  }
  else{
    res.redirect("/")
  }
});

router.get('/deleteMovie/:id', async function(req, res, next) {
  console.log('/movies -> /deleteMovie/:id')
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined  ){
    let id = req.params.id
    subsWSDAL.deleteMovieWS(id).then( res.redirect("/movies"))
  }
  else{
    res.redirect("/")
  }
});

router.post('/searchMovie', async function(req, res, next) {
  console.log('movies -> /searchMovie')
  var loginData = await loginBL.getSessionData(req)
  if(loginData !== undefined  ){
    let HelloUser = loginData[0]
    let per = loginData[1]
    let body = req.body
    let {search_param, value, sort_param, order_param } = req.body
    
    search_param = search_param === undefined ? "All" : search_param;
    sort_param = sort_param === undefined ? "Movie Name" : sort_param;
    order_param = order_param === undefined ? "inc" : order_param;

    let movies = await moviesBL.searchResults(search_param, value, sort_param, order_param)
    res.render('movies', {movies,body,HelloUser,per});
  }
  else{
    res.redirect("/")
  }
});

module.exports = router;

