const express = require('express');
const router = express.Router();

const Administrator = require('../../models/Administrator');

// @route   GET api/administrators
// @desc    get all administrators
// @access  public
router.get('/',(req,res)=>{
    Administrator.find()
        .then(administrators=>res.json(administrators))
});

// @route   POST api/administrators
// @desc    post an administrator
// @access  public
router.post('/',(req,res)=>{
    const newAdministrator= new Administrator({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    newAdministrator.save().then(administrator=>res.json(administrator));
});

// @route   DELETE api/administrator/:id
// @desc    delete an administrator
// @access  public
router.delete('/:id',(req,res)=>{
    Administrator.findById(req.params.id)
    .then(administrator=> administrator.remove().then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}));
});



module.exports=router;