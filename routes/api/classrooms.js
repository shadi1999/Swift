const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { tutorOnly , adminOnly } = require('../../middleware/privateRoutes');
const Lecture = require('../../models/Lecture');

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
    Classroom.findById(req.params.id).execPopulate('liveLecture')
        .then(classroom => {
            // Private classrooms authorization.
            if (classroom.private)
                if (req.user.kind === 'guest' || (req.user.kind === 'student' && !(classroom.students.find(req.user.id))))
                    res.status(401).json({msg:'Unauthorized'});

            res.json(classroom);
        })
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

/*
@route  POST api/classrooms/:id/start
@desc   start a new lecture in the classroom.
@access private
*/
router.post('/:id/start', auth, tutorOnly, async (req, res) => {
    try {
        const newLecture = new Lecture({
            startedOn: Date.now()
        });
        const classroom = await Classroom.findOne({id: req.params.id});

        await newLecture.save();
        classroom.liveLecture = newLecture;
        await classroom.save();
        // TODO: add socket.io code here...
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
@route  POST api/classrooms/:id/stop
@desc   stop the live lecture in the classroom.
@access private
*/
router.post('/:id/stop', auth, tutorOnly, async (req, res) => {
    try {
        const classroom = (await Classroom.findOne({id: req.params.id})).execPopulate('liveLecture');
        const { liveLecture } = classroom;
        
        if (!liveLecture.live) res.status(400).send('Lecture is already stopped.');
        liveLecture.endDate = Date.now();
        liveLecture.live = false;
        await liveLecture.save();
    
        classroom.pastLectures.push(liveLecture);
        classroom.liveLecture = undefined;
        await classroom.save();
        // TODO: add socket.io code here...
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports=router;