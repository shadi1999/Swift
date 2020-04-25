const multer = require('multer');
const express = require('express');
const router = express.Router();
const Classroom = require('../../models/Classroom');
const auth = require('../../middleware/auth');

// multer configration
const storage = multer.diskStorage({
    destination: async function (req, file, callback) {
        let classroom = await Classroom.findOne({
            id: req.params.id
        });
        callback(null, `public/files/${classroom.id}/${classroom.liveLecture._id}`);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({
    storage: storage
}).single('file');

// upload route for chat...
router.post('/upload/:id/', auth, function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
    });
});

module.exports = router;