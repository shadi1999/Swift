const { check, body, validationResult } = require('express-validator')

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
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }
    }
}