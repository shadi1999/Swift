const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { tutorOnly , adminOnly } = require('../../middleware/privateRoutes');
const {Lecture} = require('../../models/Lecture');
const Tutor = require('../../models/Tutor');

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
    Classroom.findById(req.params.id).execPopulate('liveLecture').execPopulate('students').execPopulate('tutor')
        .then(classroom => {
            // Private classrooms authorization.
            if (classroom.private && req.user.kind !== 'Administrator')
                if (!(classroom.students.find(req.user.id) || classroom.tutor._id === req.user.id))
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
router.post('/', auth, adminOnly, async (req, res) => {
    const {id, private, recordLectures, tutorId} = req.body;
    try {
        const classroom = await Classroom.findOne({id});
        if(classroom) {
            return res.status(400).json({msg:`A course with the ID ${id} already exists.`});
        }

        const tutor = await Tutor.findById(tutorId);
        if(!tutor) {
            return res.status(400).json({msg:`There's no Tutor in this id: ${tutorId}`})
        }



        const newClass = new Classroom({
            id,
            private,
            recordLectures,
            tutor: tutorId
        });

        if (private) {
            for(let student of req.body.students) {
                newClass.students.push(student);
            }
        }

        const saved = await newClass.save();
        res.status(200).json(saved);
    }
    catch(err) {
        console.error(err.message);
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
        const classroom = await Classroom.findOne({id: req.params.id});
            if(classroom.liveLecture) {
                
                return res.status(500).json('lecture already started');
            }
            const newLecture = new Lecture({
            startedOn: Date.now()
        });
        
        
        if(req.user.id != classroom.tutor) {
            return res.status(400).json('Unauthorized access:\n\tNot the allowed tutor!');
        }

        await newLecture.save();
        classroom.liveLecture = newLecture;
        await classroom.save();

        res.status(200).send();
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
        const classroom = await Classroom.findOne({id: req.params.id});
        if(!classroom.liveLecture) {
            
            return res.status(500).json('lecture already stop');
        }
        if(req.user.id != classroom.tutor) {
            return res.status(400).json('Unauthorized access:\n\tNot the allowed tutor!');
        }
        let theLecture = await Lecture.findById(classroom.liveLecture);
        theLecture.endedOn = Date.now();
        await theLecture.save();
        if(classroom.recordLectures){
            classroom.pastLectures.push(classroom.liveLecture);
        }
        classroom.liveLecture = null;
        await classroom.save();
        res.status(200).send();
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
@route  POST api/classrooms/:id/join
@desc   join live classroom and intiate socket connection.
@access private
*/
router.post('/:id/join', auth, async (req, res) => {
    try {
        const classroom = (await Classroom.findOne({id: req.params.id})).execPopulate('liveLecture');
        const { liveLecture } = classroom;
        
        if (!liveLecture.live) res.status(400).send('Lecture is not live.');
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// TODO: automatically leave classroom when user closes window.
/*
@route  POST api/classrooms/:id/leave
@desc   leave classroom and save attendance
@access private
*/
router.post('/:id/leave', auth, async (req, res) => {
    try {
        const classroom = (await Classroom.findOne({id: req.params.id})).execPopulate('liveLecture');
        const { liveLecture } = classroom;
        
        if (!liveLecture.live) res.status(400).send('Lecture is not live.');
        liveLecture.attendance.push({id: req.user.id, duration: req.body.duration});
        await liveLecture.save();
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id/getlivechat', auth, async (req, res) => {
    try{
        const classroomId = req.params.id;
        
        const classroom = await (await Classroom.findOne({id: classroomId})).populate('liveLecture').execPopulate();
        
        if(!classroom.liveLecture){
            return res.status(404).json('not found');
        }
        return res.status(200).json(classroom.liveLecture.chatMessages);
    } catch(e){
        return res.status(500).json('Error');
    }
});

module.exports=router;