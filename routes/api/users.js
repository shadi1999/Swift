const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const usersController = require('../../middleware/usersController.js');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', usersController.registerValidationRules(), usersController.validate, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if a user with the same email already exists.
        let user = await User.findOne({ email });
        if (user) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }

        user = await usersController.create();

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

module.exports = router;