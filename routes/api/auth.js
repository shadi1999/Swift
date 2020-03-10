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
    const newUser = await User.create({name: req.body.name});

    const payload = {
      user: {
        id: newUser.id
      }
    };
    usersController.jwtLogin(payload, res);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
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

  // if(guest){
  //     name=name+'2';
  // }

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

module.exports = router;