const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

//Guest model
const Guest = require('../../models/Guest');

/*
@route  GET api/guests
@desc   display all guests
@access private
*/
router.get('/',auth, (req,res)=>{
    Guest.find()
        .then(guests=>res.json(guests))
        .catch(err=>res.status(400).json({msg:'No Guests'}))
});

/*
@route  GET api/guests/:id
@desc   display a guest
@access private
*/
router.get('/:id',auth, (req,res)=>{
    Guest.findById(req.params.id)
        .then(guest=>res.json(guest))
        .catch(err=>res.status(400).json({msg:'Guest doesn\'t exsist'}))
});

module.exports=router;