const express = require('express');
const moviesBL = require('../Modules/moviesBL')

const router = express.Router();

router.route("/").get( async (req, res) => {
    let movies = await moviesBL.getMovies();
    return res.json(movies)
})

router.route("/:id").get(async (req, res) => {
    let id = req.params.id
    let movie = await moviesBL.getMovieById(id);
    return res.json(movie)
})

router.route('/:id').put(async (req, res) => {
    let obj = req.body
    let id = req.params.id
    console.log(obj,id)
    let status = await moviesBL.updateMovie(id,obj);
    return res.json(status)
})

router.route('/:id').delete( async (req, res) => {
    let id = req.params.id
    let status = await moviesBL.deleteMovie(id)
    return res.json(status)
})

router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let status = await moviesBL.createMovie(obj);
        return resp.json(status)
    })

module.exports = router;