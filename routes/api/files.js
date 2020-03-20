const multer = require('multer');
const express = require('express');
const router = express.Router();
const Classroom = require('../../models/Classroom');

//multer configration
const storage = multer.diskStorage({
    destination: async function (req, file, callback) {
        let classrom = await Classroom.findById(req.classromID);
        let lecture = await (await Classroom.findOne({ id: classroomId })).populate('liveLecture').execPopulate();
        callback(null, `public/files/${classrom._id}/${lecture._id}`);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage }).single('file');
//upload router
router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        }
        else if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
    });
});

module.exports = router;