const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

//Tutor model
const Tutor = require('../../models/Tutor');

/*
@route  GET api/tutors
@desc   display all tutors
@access private
*/
router.get('/tutors', auth,(req,res)=>{
    Tutor.find()
        .select('-password')
        .then(tutors=>res.json(tutors))
        .catch(err=>res.status(400).json({msg:'No Tutors'}))
});

/*
@route  GET api/tutors/:id
@desc   display a tutor
@access private
*/
router.get('/tutors/:id', auth,(req,res)=>{
    Tutor.findById(req.params.id)
        .select('-password')
        .then(tutor=>res.json(tutor))
        .catch(err=>res.status(400).json({msg:'Tutor doesn\'t exsist'}))
});

module.exports=router;