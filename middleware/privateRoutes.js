const Administrator = require('../models/Administrator');
const Tutor = require('../models/Tutor');
const User = require('../models/User');
const mongoose = require('mongoose');

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
    },
    privateClassroom: async (req, res, next) => {
        try {
            const { classroomId } = req.params;
            const classroom = await Classroom.findById(classroomId);
            const user = await User.findById(req.user.id);

            if (user.kind === "Admin") {
                next();
            } else if (user.kind === "Tutor") {
                classroom.tutor == user._id && next();
            } else if (user.kind === "Student") {
                classroom.students.includes(mongoose.Types.ObjectId(user._id)) && next();
            }

            res.status(401).json({msg:'Unauthorized'});
        } catch(err) {
            res.status(500).json({msg:err});
        }
    }
}