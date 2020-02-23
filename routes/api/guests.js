const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

//Guest model
const User = require('../../models/User');

/*
@route  GET api/guests
@desc   display all guests
@access private
*/
router.get('/',auth, (req,res)=>{
    User.find()
        .then(guests=>res.json(guests))
        .catch(err=>res.status(400).json({msg:'No Guests'}))
});

/*
@route  GET api/guests/:id
@desc   display a guest
@access private
*/
router.get('/:id',auth, (req,res)=>{
    User.findById(req.params.id)
        .then(guest=>res.json(guest))
        .catch(err=>res.status(400).json({msg:'Guest doesn\'t exsist'}))
});

// @route    POST api/users
// @desc     Register guest
// @access   Public
router.post('/', usersController.registerValidationRules(), usersController.validate, async (req, res) => {
    const { name } = req.body;

    try {
        user = await usersController.create(name);

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
});


module.exports=router;