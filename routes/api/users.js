const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @route   GET api/users
// @desc    get all users
// @access  public
router.get('/',(req,res)=>{
    User.find()
        .then(users=>res.json(users))
});

// @route   POST api/users
// @desc    post a user
// @access  public
router.post('/',(req,res)=>{
    const newUser= new User({
        name:req.body.name
    });

    newUser.save().then(user=>res.json(user));
});

// @route   DELETE api/users/:id
// @desc    delete a user
// @access  public
router.delete('/:id',(req,res)=>{
    User.findById(req.params.id)
    .then(user=> user.remove().then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}));
});



module.exports=router;