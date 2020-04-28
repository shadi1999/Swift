const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const config = require('config');

const User = require('../../models/User');
const usersController = require('../../middleware/usersController.js');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', usersController.loginValidationRules(), usersController.validate, async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };
    usersController.jwtLogin(payload, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
);


// @route    POST api/guest
// @desc     Login for guest students
// @access   Public
router.post('/guest', async (req, res) => {
  try {
    const newUser = await User.create({ name: req.body.name });

    const payload = {
      user: {
        id: newUser.id
      }
    };
    usersController.jwtLogin(payload, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;