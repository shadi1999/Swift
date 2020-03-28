const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { adminOnly } = require('../../middleware/privateRoutes');
const bcrypt = require('bcryptjs')
//Student model
const Student = require('../../models/Student');
const studentsController = require('../../middleware/studentsController');

/*
@route  GET api/students
@desc   display all students
@access private
*/
router.get('/', auth, adminOnly, (req, res) => {
    Student.find()
        .select('-password')
        .then(students => res.json(students))
        .catch(err => res.status(400).json({ msg: 'No Students' }))
});

/*
@route  GET api/students/:id
@desc   display a student
@access private
*/
router.get('/:id', auth, adminOnly, (req, res) => {
    Student.findById(req.params.id)
        .select('-password')
        .then(student => res.json(student))
        .catch(err => res.status(400).json({ msg: 'Student doesn\'t exsist' }))
});

// @route    POST api/students
// @desc     Register student
// @access   Public
router.post('/', studentsController.registerValidationRules(), studentsController.validate, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if a user with the same email already exists.
        let student = await User.findOne({ email });
        if (student) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
        }

        student = new Student({ name, email, password });
        const salt = await bcrypt.genSalt(10);

        student.password = await bcrypt.hash(password, salt);

        await student.save();

        const payload = {
            user: {
                id: student.id
            }
        };

        studentsController.jwtLogin(payload, res);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT api/students
// @desc     Edit a student
// @access   Private
router.put('/',
    auth,
    studentsController.editValidationRules(),
    studentsController.validate,
    async (req, res) => {
        try {
            // Check if a user with the same email already exists.
            let student = await Student.findById(req.body._id);
            if (!student) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Students does not exist.' }] });
            }

            student.email = req.body.email;
            student.name = req.body.name;
            await student.save();
            res.status(200).send();
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

// @route    DELETE api/students/:id
// @desc     delete a student
// @access   Private
router.delete('/:id',
    auth,
    async (req, res) => {
        try {
            // Check if a user with the same email already exists.
            let student = await Student.findById(req.params.id);
            if (!student) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Students does not exist.' }] });
            }

            await Student.deleteOne({ email: student.email });
            res.status(200).send();
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;