const { check, body, validationResult } = require('express-validator');
// const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    registerValidationRules: () => {
        return [
            body("email").normalizeEmail({all_lowercase: true}).trim(),
            check("email", "Email is invalid").isEmail(),
            check('name', 'Name is required').not().isEmpty(),
            check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 })
        ]
    },
    loginValidationRules: () => {
        return [
            body("email").normalizeEmail({all_lowercase: true}).trim(),
            check('email', 'Please include a valid email').isEmail(),
            check('password', 'Password is required').exists()
        ]
    },
    editValidationRules: () => {
        return [
            body("email").normalizeEmail({all_lowercase: true}).trim(),
            check("email", "Email is invalid").isEmail(),
            check('name', 'Name is required').not().isEmpty(),
        ]
    },
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }
    },
    // create: async (data) => {
    //     let user = new Student(data);
    //     await user.save();
    //     return user;
    // },
    jwtLogin: (payload, res)=>{
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
        });
    }
}