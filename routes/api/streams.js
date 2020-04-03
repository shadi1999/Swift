const express = require('express');
const auth = require('../../middleware/auth');
const tutorsController = require('../../middleware/tutorsController');
const os = require('os');
const axios = require('axios');

const router = express.Router();

// TODO: move to config.
const url = `http://www.swiftcourse.me:5080`

/*
@route  GET api/streams/publishToken?classroomId=string
@desc   get a publish token from the media server.
@access private
*/
router.get('/publishToken', auth, async (req, res) => {
    try {
        const {
            classroomId
        } = req.params;

        const classroom = await Classroom.findOne({
            id: classroomId
        });
        // Only allow the classroom's tutor.
        if (req.user.id != classroom.tutor) {
            return res.status(400).json('Unauthorized access: \nNot the allowed tutor!');
        }

        if (!classroom.liveLecture) {
            return res.status(500).json('The lecture is not live.');
        }

        // TODO: let the tutor get a new token when it expires during the stream (so the stream won't stop).
        const expiresIn = Date.now() + 3600 * 4 * 1000; // Expires in four hours.
        const mediaServerApp = classroom.recordLectures ? 'WebRTCApp' : 'LiveApp';
        const token = await axios.get(`${url}/${mediaServerApp}/rest/v2/broadcasts/${classroomId}/token?type=publish&expireDate=${expiresIn}`);

        res.status(200).send(token);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

/*
@route  GET api/streams/playToken?classroomId=string
@desc   get a play token from the media server.
@access private
*/
router.get('/playToken', auth, async (req, res) => {
    try {
        const {
            classroomId
        } = req.params;

        const classroom = await Classroom.findOne({
            id: classroomId
        });

        // TODO: add support for private classrooms here.

        if (!classroom.liveLecture) {
            return res.status(500).json('The lecture is not live.');
        }

        // TODO: let the tutor get a new token when it expires during the stream (so the stream won't stop).
        const expiresIn = Date.now() + 3600 * 4 * 1000; // Expires in four hours.
        const mediaServerApp = classroom.recordLectures ? 'WebRTCApp' : 'LiveApp';
        const token = await axios.get(`${url}/${mediaServerApp}/rest/v2/broadcasts/${classroomId}/token?type=play&expireDate=${expiresIn}`);

        res.status(200).send(token);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});