const express = require('express');
const router = express.Router();

const Student = require('../../models/Student');

// @route   GET api/students
// @desc    get all students
// @access  public
router.get('/',(req,res)=>{
    Student.find()
        .then(students=>res.json(students))
});

// @route   POST api/students
// @desc    post a student
// @access  public
router.post('/',(req,res)=>{
    const newStudent= new Student({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    newStudent.save().then(student=>res.json(student));
});

// @route   DELETE api/students/:id
// @desc    delete a student
// @access  public
router.delete('/:id',(req,res)=>{
    Student.findById(req.params.id)
    .then(student=> student.remove().then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}));
});



module.exports=router;