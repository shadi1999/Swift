const express = require('express');
const router = express.Router();

const Tutor = require('../../models/Tutor');

// @route   GET api/tutors
// @desc    get all tutors
// @access  public
router.get('/',(req,res)=>{
    Tutor.find()
        .then(tutors=>res.json(tutors))
});

// @route   POST api/tutors
// @desc    post a tutor
// @access  public
router.post('/',(req,res)=>{
    const newTutor= new Tutor({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    newTutor.save().then(tutor=>res.json(tutor));
});

// @route   DELETE api/tutors/:id
// @desc    delete a tutor
// @access  public
router.delete('/:id',(req,res)=>{
    Tutor.findById(req.params.id)
    .then(tutor=> tutor.remove().then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}));
});



module.exports=router;