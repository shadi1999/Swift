const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

//Student model
const Student = require('../../models/Student');

/*
@route  GET api/students
@desc   display all students
@access private
*/
router.get('/',auth, (req,res)=>{
    Student.find()
        .select('-password')
        .then(students=>res.json(students))
        .catch(err=>res.status(400).json({msg:'No Students'}))
});

/*
@route  GET api/students/:id
@desc   display a student
@access private
*/
router.get('/:id', auth,(req,res)=>{
    Student.findById(req.params.id)
        .select('-password')
        .then(student=>res.json(student))
        .catch(err=>res.status(400).json({msg:'Student doesn\'t exsist'}))
});
module.exports=router;