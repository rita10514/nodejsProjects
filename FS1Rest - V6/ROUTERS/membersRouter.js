const express = require('express');
const membersBL = require('../Modules/membersBL')

const router = express.Router();

router.route("/").get( async (req, res) => {
    let members = await membersBL.getMembers();
    return res.json(members)
})

router.route("/:id").get(async (req, res) => {
    let id = req.params.id
   
    let member = await membersBL.getMemberbyId(id);
    return res.json(member)
})

router.route('/:id').put(async (req, res) => {
    let obj = req.body
    let id = req.params.id
    let status = await membersBL.updateMember(id,obj);
    return res.json(status)
})

router.route('/:id').delete( async (req, res) => {
    let id = req.params.id
    let status = await membersBL.deleteMember(id)
    return res.json(status)
})

router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let status = await membersBL.createMember(obj);
        return resp.json(status)
    })

module.exports = router;