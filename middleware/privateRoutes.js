const Administrator = require('../models/Administrator');
const Tutor = require('../models/Tutor');

module.exports = {
    adminOnly: (req, res, next) => {
        Administrator.find({'email': req.user.email})
            .then(next)
            .catch(res.status(401).json({msg:'Unauthorized'})
        );
    },
    tutorOnly: (req, res, next) => {
        Tutor.find({'email': req.user.email})
            .then(next)
            .catch(res.status(401).json({msg:'Unauthorized'})
        );
    }
}