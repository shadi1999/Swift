const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

//Administrator model
const Administrator = require('../../models/Administrator');

/*
@route  GET api/administrators
@desc   display all administrators
@access private
*/
router.get('/',auth, (req,res)=>{
    Administrator.find()
        .select('-password')
        .then(administrators=>res.json(administrators))
        .catch(err=>res.status(400).json({msg:'No Administrators'}))
});

/*
@route  GET api/administrators/:id
@desc   display an administrator
@access private
*/
router.get('/:id', auth,(req,res)=>{
    Administrator.findById(req.params.id)
        .select('-password')
        .then(administrator=>res.json(administrator))
        .catch(err=>res.status(400).json({msg:'Administrator doesn\'t exsist'}))
});

module.exports=router;