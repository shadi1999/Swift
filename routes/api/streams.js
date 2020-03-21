const express = require('express');
const auth = require('../../middleware/auth');
const tutorsController = require('../../middleware/tutorsController');
const os = require('os');
const http = require('http');

const router = express.Router();

// TODO: move to config.
const url = `https://${os.hostname()}/`

/*
@route  POST api/classrooms/:id/start
@desc   start a new lecture in the classroom.
@access private
*/
router.get('/token', auth, (req, res) => {
    try {
        const classroom = await Classroom.findOne({id: req.query.id});
        // Only allow the classroom's tutor.
        if(req.user.id != classroom.tutor) {
            return res.status(400).json('Unauthorized access: \nNot the allowed tutor!');
        }

        if(!classroom.liveLecture) {
            return res.status(500).json('The lecture is not live.');
        }



        res.status(200).send();
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});