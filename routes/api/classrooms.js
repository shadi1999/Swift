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
const Student = require('../../models/Student');
const Tutor = require('../../models/Tutor');
const fs = require('fs')
const os = require('os');
const axios = require('axios');
const User = require('../../models/User');
//Classroom model
const Classroom = require('../../models/Classroom');

/*
@route  GET api/classrooms
@desc   get all classrooms data
@access private
*/
router.get('/', auth, adminOnly, (req, res) => {
    Classroom.find().populate('tutor')
        .then(classrooms => res.json(classrooms))
        .catch(err => res.status(400).json({
            msg: 'No Classrooms'
        }))
});

/*
@route  GET api/classrooms/:id
@desc   get one classroom's data by ID
@access private
*/
router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    Classroom.findOne({
        id: req.params.id
    }).populate('liveLecture').populate('students').populate('tutor')
        .then(classroom => {
            // Private classrooms authorization.
            if (classroom.private) {
                switch (user.kind) {
                    case 'Tutor':
                        if (classroom.tutor == req.user.id) {
                            console.log(classroom.tutor, req.user.id)
                            return res.status(200).json(classroom);
                        }
                        break;
                    case 'Administrator':
                        res.status(200).json(classroom);
                        break;
                    case 'Student':
                        if (classroom.students.some(student => student._id == req.user.id)) {
                            return res.status(200).json(classroom);
                            break;
                        }
                    default:
                        return res.status(401).json({
                            msg: 'Unauthorized'
                        });
                        break;
                }
            }

            res.json(classroom);
        })
        .catch(err => res.status(500).json({
            msg: 'Internal server error.'
        }))
});


// TODO: move to config.
// TODO: change this url to https.
const url = `http://www.swiftcourse.me:5080`


/*
@route  POST api/classrooms
@desc   Add a new classroom
@access private
*/
router.post('/', auth, adminOnly, async (req, res) => {
    const {
        id,
        Private,
        record,
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

        const thetutor = await Tutor.findOne({
            email: tutor
        });
        if (!thetutor) {
            return res.status(400).json({
                msg: `There's no Tutor in this id: ${thetutor._id}`
            })
        }

        const newClass = new Classroom({
            id: id,
            private: Private,
            recordLectures: record,
            tutor: thetutor._id
        });

        if (Private && req.body.students) {
            // Add the students allowed to attend the class.
            for (let student of req.body.students) {
                newClass.students.push(student);
            }
        }

        // TODO: remove stream from the media server in /classrooms DELETE route.
        // Create a new stream in the media server.
        const mediaServerApp = record ? 'WebRTCApp' : 'LiveApp';
        newClass.mediaServerApp = mediaServerApp;
        const newStream = await axios.post(`${url}/${mediaServerApp}/rest/v2/broadcasts/create`, {
            name: id,
            publicStream: false
        });

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
@route  DELETE api/classrooms/:id
@desc   delete a classroom by ID
@access private
*/
router.delete('/:id', auth, adminOnly, async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const classroom = Classroom.findOne({
            id
        });
        if (!classroom) {
            return res.status(400).json({
                msg: `No course with name ${id} was exsist`
            });
        }
        await Classroom.deleteOne({
            id
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
@route  PUT api/classrooms
@desc   Edit a classroom
@access private
*/
router.put('/', auth, adminOnly, async (req, res) => {
    const {
        id,
        email,
        Private,
        record,
        newid
    } = req.body;
    try {
        const classroom = await Classroom.findOne({
            id
        });
        const thetutor = await Tutor.findOne({
            email: email
        });
        if (!thetutor) {
            return res.status(400).json('Tutor is not exsist');
        }
        classroom.id = newid;
        classroom.tutor = thetutor._id;
        classroom.private = Private;
        classroom.recordLectures = record;
        await classroom.save();
        res.status(200).json("classroom updated successfuly");
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Error happened"
        });
    }
});

/*
@route  POST api/classrooms/:id/start
@desc   start a new lecture in the classroom.
@access private
*/
router.post('/:id/start', auth, tutorOnly, async (req, res) => {
    try {
        const classroomId = req.params.id;
        const classroom = await Classroom.findOne({
            id: classroomId
        });

        // Authorization.
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
router.post('/:id/stop', auth, tutorOnly, async (req, res) => {
    try {
        const classroom = await Classroom.findOne({
            id: req.params.id
        });

        // Authorization.
        if (!classroom.liveLecture) {
            return res.status(500).json('lecture already stop');
        }
        if (req.user.id != classroom.tutor) {
            return res.status(400).json('Unauthorized access:\n\tNot the allowed tutor!');
        }

        let theLecture = await Lecture.findById(classroom.liveLecture);
        theLecture.endedOn = Date.now();
        await theLecture.save();

        classroom.pastLectures.push(theLecture);
        classroom.liveLecture = null;
        await classroom.save();
        res.status(200).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
@route  GET api/classrooms/:id/getlivechat
@desc   get the chat messages of the live lecture by classroom ID.
@access private
*/
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
@route  GET api/classrooms/tutor/:id/lectures
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
        for (var classroom of classrooms) {
            for (var lecture of classroom.pastLectures) {
                for (var attendance of lecture.attendance) {
                    if (attendance.user) {
                        const u = await User.findById(attendance.user);
                        if (u) {
                            attendance.user = u;
                        }
                    }
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
@route  GET api/classrooms/student/:id/lectures
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
        const classrooms = await Classroom.find().populate('tutor');
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

/*
@rote   POST api/classroom/students
@desc   Add a student to a classroom
@access private
*/
router.post('/:id/students/:email', auth, tutorOnly, async (req, res) => {
    try {
        let { email, id } = req.params;
        let student = await Student.findOne({ email });
        let classroom = await Classroom.findOne({ id });
        if (!student || !classroom) {
            return res.status(400).json('No student or No classroom, Invaild student email or classroom id');
        }
        classroom = classroom.populate('students');
        for (std of classroom.students) {
            if (std == student._id) {
                return res.status(400).json('student already added');
            }
        }
        classroom.students.push(student._id);
        await classroom.save();
        return res.status(200).json(student);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error');
    }
});

/*
@rote   GET api/classroom/students
@desc   get students of a classroom
@access private
*/
router.get('/:id/students', auth, tutorOnly, async (req, res) => {
    try {
        let { id } = req.params;
        let classroom = await Classroom.findOne({ id }).populate('students');
        if (!classroom) {
            return res.status(400).json('No classroom with this id');
        }
        return res.status(200).json(classroom.students);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error');
    }
});

/*
@rote   DELETE api/classroom/students
@desc   Remove a student from a classroom
@access private
*/
router.delete('/:id/students/:email', auth, tutorOnly, async (req, res) => {
    try {
        let deletedStudent;
        let { email, id } = req.params;
        let student = await Student.findOne({ email });
        // let classroom = await Classroom.findOne({ id });
        if (!student) {
            return res.status(400).json('No student, Invaild student email');
        }

        const classroom = await Classroom.findOne({ id }).populate('students');

        classroom.students.remove(student._id)

        await classroom.save();
        return res.status(200).json(classroom.students);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error');
    }
});

module.exports = router;