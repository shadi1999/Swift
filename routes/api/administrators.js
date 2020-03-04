const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const tutorsController = require('../../middleware/tutorsController');
const {adminOnly} = require('../../middleware/privateRoutes');
//Administrator model
const Administrator = require('../../models/Administrator');

/*
@route  GET api/administrators
@desc   display all administrators
@access private
*/
router.get('/',auth, adminOnly,(req,res)=>{
    Administrator.find()
        .select('-password')
        .then(administrators=>res.json(administrators))
        .catch(err=>res.status(400).json({msg:'No Administrators'}))
});

/*
@route  GET api/administrators/:id
@desc   display an administrator
@access private
*/
router.get('/:id', auth,adminOnly,(req,res)=>{
    Administrator.findById(req.params.id)
        .select('-password')
        .then(administrator=>res.json(administrator))
        .catch(err=>res.status(400).json({msg:'Administrator doesn\'t exsist'}))
});


// @route    POST api/administrators
// @desc     Add Administrator
// @access   Public
router.post('/', auth, adminOnly,
async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if a user with the same email already exists.
        let user = await User.findOne({ email });
        if (user) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }

        const admin = new Administrator({ name, email, password });
        await admin.save();

        const payload = {
            user: {
                id: admin.id
            }
        };

        tutorsController.jwtLogin(payload, res);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports=router;