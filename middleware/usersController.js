const { check, body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    registerValidationRules: () => {
        return [
            check('name', 'Name is required').not().isEmpty(),
        ]
    },
    loginValidationRules: () => {
        return [
            body("email").normalizeEmail({all_lowercase: true}).trim(),
            check('email', 'Please include a valid email').isEmail(),
            check('password', 'Password is required').exists()
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
    create: async (name) => {
        let user = new User({
            name
        });

        await user.save();
        return user;
    },
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