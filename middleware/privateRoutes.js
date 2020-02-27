const Administrator = require('../models/Administrator');
const Tutor = require('../models/Tutor');

module.exports = {
    adminOnly: async (req, res, next) => {
        try {
            const admin = await Administrator.findById(req.user.id);
            if (!admin) {
                res.status(401).json({msg:'Unauthorized'});
            } else {
                next();
            }
        } catch(err) {
            res.status(500).json({msg:err});
        }
    },
    tutorOnly: async (req, res, next) => {
        try {
            const tutor = await Tutor.findById(req.user.id);
            if (!tutor) {
                res.status(401).json({msg:'Unauthorized'});
            } else {
                next();
            }
        } catch(err) {
            res.status(500).json({msg:err});
        }
    }
}