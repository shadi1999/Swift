const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const {
    tutorOnly,
    adminOnly
} = require('../../middleware/privateRoutes');
const {
    Lecture
} = require('../../models/Lecture');
const Tutor = require('../../models/Tutor');
const fs = require('fs')

//Classroom model
const Classroom = require('../../models/Classroom');

/*
@route  GET api/classrooms
@desc   get all classrooms data
@access private
*/
router.get('/', auth, adminOnly, (req, res) => {
    Classroom.find()
        .then(classrooms => res.json(classrooms))
        .catch(err => res.status(400).json({
            msg: 'No Classrooms'
        }))
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
                    res.status(401).json({
                        msg: 'Unauthorized'
                    });

            res.json(classroom);
        })
        .catch(err => res.status(400).json({
            msg: 'Classroom doesn\'t exsist'
        }))
});

/*
@route  POST api/classrooms
@desc   Add a classroom
@access private
*/
router.post('/', auth, adminOnly, async (req, res) => {
    const {
        id,
        Private,
        recordLectures,
        tutor
    } = req.body;
    try {
        const classroom = await Classroom.findOne({
            id
        });
        if (classroom) {
            return res.status(400).json({
                msg: `A course with the ID ${id} already exists.`
            });
        }

        const thetutor = await Tutor.findOne({ email: tutor });
        if (!thetutor) {
            return res.status(400).json({
                msg: `There's no Tutor in this id: ${thetutor._id}`
            })
        }

        const newClass = new Classroom({
            id,
            Private,
            recordLectures,
            tutor: thetutor
        });

        if (Private) {
            for (let student of req.body.students) {
                newClass.students.push(student);
            }
        }

        // Create a new directory for saving chat attachments.
        fs.mkdirSync('public/files/' + id);

        const saved = await newClass.save();
        res.status(200).json(saved);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            msg: 'Error happened'
        });
    }
});

/*
@route  POST api/classrooms
@desc   delete a classroom
@access private
*/
router.delete('/', auth, adminOnly, (req, res) => {
    const {
        course
    } = req.body;

    try {
        const classroom = Classroom.findOne(course);
        if (!classroom) {
            return res.status(400).json({
                msg: `No course with name ${course} was exsist`
            });
        }
        Classroom.remove({
            name: course
        });
        res.status(200).json({
            msg: 'Done'
        });
    } catch (e) {
        res.status(400).json({
            msg: 'Error happened'
        });
    }
});

/*
@route  POST api/classrooms/:id/start
@desc   start a new lecture in the classroom.
@access private
*/
router.post('/:id/start', auth, async (req, res) => {
    try {
        const classroomId = req.params.id;
        const classroom = await Classroom.findOne({
            id: classroomId
        });

        if (req.user.id != classroom.tutor) {
            return res.status(400).json('Unauthorized access:\n\tNot the allowed tutor!');
        }

        if (classroom.liveLecture) {
            return res.status(500).json('lecture already started');
        }

        let newLecture = new Lecture({
            startedOn: Date.now()
        });
        newLecture = await newLecture.save();

        // Create a new directory for saving chat attachments.
        fs.mkdirSync(`public/files/${classroomId}/${newLecture._id}`);

        classroom.liveLecture = newLecture;
        await classroom.save();

        res.status(200).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
@route  POST api/classrooms/:id/stop
@desc   stop the live lecture in the classroom.
@access private
*/
router.post('/:id/stop', auth, async (req, res) => {
    try {
        const classroom = await Classroom.findOne({
            id: req.params.id
        });
        if (!classroom.liveLecture) {

            return res.status(500).json('lecture already stop');
        }
        if (req.user.id != classroom.tutor) {
            return res.status(400).json('Unauthorized access:\n\tNot the allowed tutor!');
        }
        let theLecture = await Lecture.findById(classroom.liveLecture);
        theLecture.endedOn = Date.now();
        await theLecture.save();
        if (classroom.recordLectures) {
            classroom.pastLectures.push(classroom.liveLecture);
        }
        classroom.liveLecture = null;
        await classroom.save();
        res.status(200).send();
    } catch (err) {
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
        const classroom = (await Classroom.findOne({
            id: req.params.id
        })).execPopulate('liveLecture');
        const {
            liveLecture
        } = classroom;

        if (!liveLecture.live) res.status(400).send('Lecture is not live.');
    } catch (err) {
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
        const classroom = (await Classroom.findOne({
            id: req.params.id
        })).execPopulate('liveLecture');
        const {
            liveLecture
        } = classroom;

        if (!liveLecture.live) res.status(400).send('Lecture is not live.');
        liveLecture.attendance.push({
            id: req.user.id,
            duration: req.body.duration
        });
        await liveLecture.save();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id/getlivechat', auth, async (req, res) => {
    try {
        const classroomId = req.params.id;

        const classroom = await (await Classroom.findOne({
            id: classroomId
        })).populate('liveLecture').execPopulate();

        if (!classroom.liveLecture) {
            return res.status(404).json('not found');
        }
        return res.status(200).json(classroom.liveLecture.chatMessages);
    } catch (e) {
        return res.status(500).json('Error');
    }
});

/*
@route  GET api/classrooms/tutor/:id
@desc   get a tutor's classrooms
@access private
*/
router.get('/tutor/:id/lectures', auth, tutorOnly, async (req, res) => {
    try {
        let tutorId = req.params.id;
        let lectures = [];
        const classrooms = await Classroom.find();
        for (var classroom of classrooms) {
            if (classroom.tutor == tutorId) {
                let lecture = await classroom.populate('pastLectures').execPopulate();
                lectures.push(lecture);
            }
        }
        return res.status(200).json(lectures);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error');
    }
});

/*
@route  GET api/classrooms/tutor/:id
@desc   get a tutor's classrooms
@access private
*/
router.get('/tutor/:id', auth, tutorOnly, async (req, res) => {
    try {
        let tutorId = req.params.id;
        let classes = [];
        const classrooms = await Classroom.find();
        for (var classroom of classrooms) {
            if (classroom.tutor == tutorId) {
                classes.push(classroom);
            }
        }
        return res.status(200).json(classes);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error');
    }
});


//STUDENT
/*
@route  GET api/classrooms/student/:id
@desc   get a student's classrooms
@access private
*/
router.get('/student/:id/lectures', auth, async (req, res) => {
    try {
        let studentId = req.params.id;
        let lectures = [];
        const classrooms = await Classroom.find();
        for (var classroom of classrooms) {
            for (var student of classroom.students) {
                if (student == studentId) {
                    let lecture = await classroom.populate('pastLectures').execPopulate();
                    lectures.push(lecture);
                }
            }
        }
        return res.status(200).json(lectures);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error');
    }
});

/*
@route  GET api/classrooms/student/:id
@desc   get a student's classrooms
@access private
*/
router.get('/student/:id', auth, async (req, res) => {
    try {
        let studentId = req.params.id;
        let classes = [];
        const classrooms = await Classroom.find();
        for (var classroom of classrooms) {
            for (var student of classroom.students) {
                if (student == studentId) {
                    classes.push(classroom);
                }
            }
        }
        return res.status(200).json(classes);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error');
    }
});

module.exports = router;