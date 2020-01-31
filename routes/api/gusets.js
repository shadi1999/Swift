const express = require('express');
const router = express.Router();

const Guest = require('../../models/Guset');

// @route   GET api/gusets
// @desc    get all gusets
// @access  public
router.get('/',(req,res)=>{
    Guest.find()
        .then(gusets=>res.json(gusets))
});

// @route   POST api/gusets
// @desc    post a guset
// @access  public
router.post('/',(req,res)=>{
    const newGuest= new Guest({
        name:req.body.name
    });

    newGuest.save().then(guset=>res.json(guset));
});

// @route   DELETE api/gusets/:id
// @desc    delete a guset
// @access  public
router.delete('/:id',(req,res)=>{
    Guest.findById(req.params.id)
    .then(guset=> guset.remove().then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}));
});



module.exports=router;