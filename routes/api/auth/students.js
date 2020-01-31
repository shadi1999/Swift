const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');



//Student Model
const Student = require('../../models/Student');

// @route   POST api/auth/students
// @desc    Auth student
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing student
  Student.findOne({ email })
    .then(student => {
      if(!student) return res.status(400).json({ msg: 'Student Does not exist' });

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
    })
});

// @route   GET api/auth/students/student
// @desc    Get student data
// @access  Private
router.get('/student', auth, (req, res) => {
  Student.findById(req.student.id)
    .select('-password')
    .then(student => res.json(student));
});

module.exports = router;
