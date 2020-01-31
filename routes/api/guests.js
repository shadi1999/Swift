const express = require('express');
const router = express.Router();

const Guest = require('../../models/Guest');

// @route   GET api/guests
// @desc    get all guests
// @access  public
router.get('/',(req,res)=>{
    Guest.find()
        .then(guests=>res.json(guests))
});

// @route   POST api/guests
// @desc    post a guest
// @access  public
router.post('/',(req,res)=>{
    const newGuest= new Guest({
        name:req.body.name
    });

    newGuest.save().then(guest=>res.json(guest));
});

// @route   DELETE api/guests/:id
// @desc    delete a guest
// @access  public
router.delete('/:id',(req,res)=>{
    Guest.findById(req.params.id)
    .then(guest=> guest.remove().then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}));
});



module.exports=router;