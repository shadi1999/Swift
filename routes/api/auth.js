const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');




//import all models for login || registration actions
const Guest = require('../../models/Guest');
const Student = require('../../models/Student');
const Tutor = require('../../models/Tutor');
const Administrator = require('../../models/Administrator');
const ClassRoom = require('../../models/ClassRoom');


/*
@route  POST api/auth/login
@desc   Authenticate user & get token
@access public
*/
//some needed functions
function findTutors(email, password){
    // Check for existing tutor
    Tutor.findOne({ email })
        .then(tutor => {
        if(!tutor) return findStudents(email, password);

        // Validate password
        bcrypt.compare(password, tutor.password)
            .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            jwt.sign(
                { id: tutor.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    tutor: {
                    id: tutor.id,
                    name: tutor.name,
                    email: tutor.email
                    }
                });
                }
            )
        })
    });
}

function findStudents(email, password){
    // Check for existing student
    Student.findOne({ email })
        .then(student => {
        if(!student) return res.status(400).json({msg:'no user here!'});

        // Validate password
        bcrypt.compare(password, student.password)
            .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            jwt.sign(
                { id: student.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    student: {
                    id: student.id,
                    name: student.name,
                    email: student.email
                    }
                });
                }
            )
        })
    });
}
//Login Router
router.post('/login',(req,res)=>{
    const { email, password } = req.body;

    // Simple validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing administrator
    Administrator.findOne({ email })
        .then(administrator => {
        if(!administrator) return findTutors(email, password);

        // Validate password
        bcrypt.compare(password, administrator.password)
            .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            jwt.sign(
                { id: administrator.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    administrator: {
                    id: administrator.id,
                    name: administrator.name,
                    email: administrator.email
                    }
                });
                }
            )
        })
    });
});

/*
@route  api/auth/register/administrator
@desc   Registration page for Administrators
@access public
*/
router.post('/register/administrator',(req,res)=>{
    const { name, email, password } = req.body;

    // Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing administrator
    Administrator.findOne({ email })
        .then(administrator => {
        if(administrator) return res.status(400).json({ msg: 'Administrator already exists' });

        const newAdministrator = new Administrator({
            name,
            email,
            password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdministrator.password, salt, (err, hash) => {
            if(err) throw err;
            newAdministrator.password = hash;
            newAdministrator.save()
                .then(administrator => {
                jwt.sign(
                    { id: administrator.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        administrator: {
                        id: administrator.id,
                        name: administrator.name,
                        email: administrator.email
                        }
                    });
                    }
                )
                });
            })
        })
    })

});

/*
@route  api/auth/register/tutor
@desc   Registration page for Tutors
@access public
*/
router.post('/register/tutor',(req,res)=>{
    const { name, email, password } = req.body;

    // Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing tutor
    Tutor.findOne({ email })
        .then(tutor => {
        if(tutor) return res.status(400).json({ msg: 'Tutor already exists' });

        const newTutor = new Tutor({
            name,
            email,
            password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newTutor.password, salt, (err, hash) => {
            if(err) throw err;
            newTutor.password = hash;
            newTutor.save()
                .then(tutor => {
                jwt.sign(
                    { id: tutor.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        tutor: {
                        id: tutor.id,
                        name: tutor.name,
                        email: tutor.email
                        }
                    });
                    }
                )
                });
            })
        })
    })

});

/*
@route  api/auth/register/student
@desc   Registration page for Students
@access public
*/
router.post('/register/student',(req,res)=>{
    const { name, email, password } = req.body;

    // Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing student
    Student.findOne({ email })
        .then(student => {
        if(student) return res.status(400).json({ msg: 'Student already exists' });

        const newStudent = new Student({
            name,
            email,
            password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newStudent.password, salt, (err, hash) => {
            if(err) throw err;
            newStudent.password = hash;
            newStudent.save()
                .then(student => {
                jwt.sign(
                    { id: student.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        student: {
                        id: student.id,
                        name: student.name,
                        email: student.email
                        }
                    });
                    }
                )
                });
            })
        })
    })

});
/*
@route  POST api/auth/attend
@desc   attending lectures for guests
@access public
*/
router.post('/attend',(req,res)=>{
    const {name,course}= req.body;
    if(!name||!course){
        return res.status(400).json({msg:'guest name and course code must be provided'});
    }

    const classroom = ClassRoom.findOne({name:course});
    const guest = classroom.guests.findOne({name});
    if(guest){
        name=name+'2';
    }

    const newGuest = new Guest({
        name
    });
    classroom.guests.push(newGuest);
    res.status(200).json(newGuest);
    
});
/*
@route  POST api/auth/leave
@desc   leaving lectures for guests
@access public
*/
router.post('/leave',(req,res)=>{
    const {name,course}= req.body;
    if(!name||!course){
        return res.status(400).json({msg:'guest name and course code must be provided'});
    }

    const classroom = ClassRoom.findOne({name:course});
    const guest = classroom.guests.findOne({name});
    if(!guest){
        return res.status(400).json({msg:'No such guest'});
    }
    Guest.remove({name:name});
    res.status(200).json(`${name} left`);
    
});


module.exports=router;