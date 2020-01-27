const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../../middleware/auth');


//Tutor Model
const Tutor = require('../../../models/Tutor');

// @route   POST api/auth/tutors
// @desc    Auth tutor
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing tutor
  Tutor.findOne({ email })
    .then(tutor => {
      if(!tutor) return res.status(400).json({ msg: 'Tutor Does not exist' });

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
    })
});

// @route   GET api/auth/tutors/tutor
// @desc    Get tutor data
// @access  Private
router.get('/tutor', auth, (req, res) => {
  Tutor.findById(req.tutor.id)
    .select('-password')
    .then(tutor => res.json(tutor));
});

module.exports = router;
