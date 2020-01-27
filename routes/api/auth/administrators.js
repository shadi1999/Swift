const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../../middleware/auth');


//Administrator Model
const Administrator = require('../../../models/Administrator');

// @route   POST api/auth/administrators
// @desc    Auth administrator
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing administrator
  Administrator.findOne({ email })
    .then(administrator => {
      if(!administrator) return res.status(400).json({ msg: 'Administrator Does not exist' });

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
    })
});

// @route   GET api/auth/administrators/administrator
// @desc    Get administrator data
// @access  Private
router.get('/administrator', auth, (req, res) => {
  Administrator.findById(req.administrator.id)
    .select('-password')
    .then(administrator => res.json(administrator));
});

module.exports = router;
