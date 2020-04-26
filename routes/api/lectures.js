const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const Classroom = require('../../models/Classroom');
const { Lecture } = require('../../models/Lecture');
const User = require('../../models/User');
const mongoose = require('mongoose');
const fs = require('fs');
const { privateClassroom } = require('../../middleware/privateRoutes');

/*
@route  GET api/lectures/:classroomId/:id
@desc   Returns a lecture's data by ID.
@access private
*/
router.get('/:classroomId/:id', auth, privateClassroom, async (req, res) => {
    const { classroomId, id } = req.params;

    try {
        const classroom = await Classroom.findOne({id: classroomId});
        // If the lecture actually exists in the classroom.
        if(classroom.pastLectures.includes(mongoose.Types.ObjectId(id))) {
            const lecture = await Lecture.findById(id);

            // // Find the name of each message sender and replace it with _id.
            // const names = {};
            // for (let message of lecture.chatMessages) {
            //     let sender = message.sender;
            //     if(!names[sender]) {
            //         let user = await User.findById(sender, {"name": 1});
            //         names[sender] = user.name;
            //     }
            //     lecture.chatMessages.sender = names[sender];
            // }

            // Find each message sender and add their data to onlineUsers.
            const onlineUsers = [];
            for (let message of lecture.chatMessages) {
                let sender = message.sender;
                if(!onlineUsers.find(u => sender === u._id)) {
                    let user = await User.findById(sender, {"name": 1});
                    onlineUsers.push(user);
                }
            }
            lecture.onlineUsers = onlineUsers;

            // Find the stream files and add them to the response.
            const streamHistory = {};
            const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            let minute = 0;
            // console.log(new Date(lecture.startedOn.valueOf()))
            // console.log(new Date(lecture.startedOn.valueOf() + 60000))
            for (date = lecture.startedOn; date <= lecture.endedOn; date = new Date(date.valueOf() + 60000)) {
                // File name (e.g. TM101-2020-04-24_12-34.mp4).
                let fileName = `${classroomId}-${date.getFullYear()}-${months[date.getMonth()]}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}.mp4`;
                console.log(fileName)
                if (fs.existsSync(`/usr/local/antmedia/webapps/WebRTCApp/streams/${fileName}`)) {
                    // If the stream file exists.
                    streamHistory[minute] = fileName;
                }

                minute++;
            }
            console.log('s', streamHistory)
            lecture.streamHistory = streamHistory;
            console.log('f', lecture.streamHistory )


            return res.status(200).json({lecture, streamHistory});
        }

        return res.status(400).json({msg: "Bad request."});
    } catch(e) {
        console.log(e);
        return res.status(500).json({msg: "Internal server error."});
    }
});

module.exports = router;