const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { tutorOnly , adminOnly } = require('../../middleware/privateRoutes');

//Classroom model
const Classroom = require('../../models/Classroom');

/*
@route  GET api/classrooms
@desc   get all classrooms data
@access private
*/
router.get('/', auth, adminOnly, (req, res)=>{
    Classroom.find()
        .then(classrooms=>res.json(classrooms))
        .catch(err=>res.status(400).json({msg:'No Classrooms'}))
});

/*
@route  GET api/classrooms/:id
@desc   get a classroom's data
@access private
*/
router.get('/:id', auth, (req, res) => {
    Classroom.findById(req.params.id)
        .then(classroom=>res.json(classroom))
        .catch(err=>res.status(400).json({msg:'Classroom doesn\'t exsist'}))
});

/*
@route  POST api/classrooms
@desc   Add a classroom
@access private
*/
router.post('/', auth, adminOnly, (req, res)=>{
    const {course} = req.body;
    try {
        const classroom = Classroom.findOne(course);
        if(classroom) {
            return res.status(400).json({msg:`A course with name ${course} is exsisted`});
        }
        const newClass = new Classroom({
            name:course
        });
        const saved = newClass.save();
        res.status(200).json(saved);
    }
    catch(e) {
        res.status(400).json({msg:'Error happened'});
    }
});

/*
@route  POST api/classrooms
@desc   delete a classroom
@access private
*/
router.delete('/', auth, adminOnly, (req, res)=>{
    const {course} = req.body;

    try {
        const classroom = Classroom.findOne(course);
        if(!classroom) {
            return res.status(400).json({msg:`No course with name ${course} was exsist`});
        }
        Classroom.remove({name:course});
        res.status(200).json({msg:'Done'});
    }
    catch(e) {
        res.status(400).json({msg:'Error happened'});
    }
});

module.exports=router;