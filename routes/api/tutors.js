const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { adminOnly } = require('../../middleware/privateRoutes');
// Tutor model
const Tutor = require('../../models/Tutor');

const tutorsController = require('../../middleware/tutorsController');

/*
@route  GET api/tutors
@desc   display all tutors
@access private
*/
router.get('/', auth, adminOnly, (req, res) => {
    Tutor.find()
        .select('-password')
        .then(tutors => res.json(tutors))
        .catch(err => res.status(400).json({ msg: 'No Tutors' }))
});

/*
@route  GET api/tutors/:id
@desc   display a tutor
@access private
*/
router.get('/:id', auth, adminOnly, (req, res) => {
    Tutor.findById(req.params.id)
        .select('-password')
        .then(tutor => res.json(tutor))
        .catch(err => res.status(400).json({ msg: 'Tutor doesn\'t exsist' }))
});

// @route    POST api/tutors
// @desc     Register tutor
// @access   Public
router.post('/',
    tutorsController.registerValidationRules(),
    tutorsController.validate,
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

            const tutor = new Tutor({ name, email, password });
            await tutor.save();

            const payload = {
                user: {
                    id: tutor.id
                }
            };

            tutorsController.jwtLogin(payload, res);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

// @route    PUT api/tutors
// @desc     Edit a tutor
// @access   Private
router.put('/',
    auth,
    tutorsController.editValidationRules(),
    tutorsController.validate,
    async (req, res) => {
        try {
            // Check if a user with the same email already exists.
            let tutor = await Tutor.findById(req.body._id);
            if (!tutor) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Tutors does not exist.' }] });
            }

            tutor.email = req.body.email;
            tutor.name = req.body.name;
            await tutor.save();
            res.status(200).send();
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

// @route    DELETE api/tutors/:id
// @desc     delete a tutor
// @access   Private
router.delete('/:id',
    auth,
    async (req, res) => {
        try {
            // Check if a user with the same email already exists.
            let tutor = await Tutor.findById(req.params.id);
            if (!tutor) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Tutors does not exist.' }] });
            }

            await Tutor.deleteOne({ email: tutor.email });
            res.status(200).send();
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;