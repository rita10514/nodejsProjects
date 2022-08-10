const express = require('express');
const subsBL = require('../Modules/subsBL')

const router = express.Router();

router.route("/").get( async (req, res) => {
    let sub = await subsBL.getSubs();
    return res.json(sub)
})

router.route("/:id").get(async (req, res) => {
    let id = req.params.id
    let sub = await subsBL.getSubByMemberID(id);
    return res.json(sub)
})

router.route('/addMovie2sub/:id').put(async (req, res) => {
    var today = new Date();
    //var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    let movie = {
        "movieId": req.body.movieId,
        "date" :  req.body.date
    }
    
    let id = req.params.id
    
    let status = await subsBL.addMovie2sub(id,movie);
    return res.json(status)
})

router.route('/deleteMovieFromSub/:id/:movieId').put(async (req, res) => {
    let id = req.params.id
    let movieId = req.params.movieId
    let status = await subsBL.deleteMovieFromSub(id,movieId);
    return res.json(status)
})

router.route('/deleteSubByMemberId/:id').delete(async (req, res) => {
    let id = req.params.id
    let status = await subsBL.deleteSubByMemberId(id);
    return res.json(status)
})



router.route('/:id').delete( async (req, res) => {
    let id = req.params.id
    let status = await subsBL.deleteSub(id)
    return res.json(status)
})

router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let status = await subsBL.createSub(obj);
        return resp.json(status)
    })

module.exports = router;