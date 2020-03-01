const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const {adminOnly} = require('../../middleware/privateRoutes');

//Student model
const Student = require('../../models/Student');
const studentController = require('../../middleware/studentsController');

/*
@route  GET api/students
@desc   display all students
@access private
*/
router.get('/', auth, adminOnly, (req,res)=>{
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
router.get('/:id', auth, adminOnly, (req,res)=>{
    Student.findById(req.params.id)
        .select('-password')
        .then(student=>res.json(student))
        .catch(err=>res.status(400).json({msg:'Student doesn\'t exsist'}))
});

// @route    POST api/students
// @desc     Register student
// @access   Public
router.post('/', studentController.registerValidationRules(), studentController.validate, async (req, res) => {
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
        await student.save();

        const payload = {
            user: {
                id: student.id
            }
        };

        studentController.jwtLogin(payload, res);
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
adminOnly,
studentController.editValidationRules(),
studentController.validate,
async (req, res) => {
    try {
        // Check if a user with the same email already exists.
        let student = await Student.findById(req.body.id);
        if (!user) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Students does not exist.' }] });
        }

        student = req.body;
        await student.save();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports=router;