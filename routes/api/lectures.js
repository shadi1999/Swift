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
            const formatDate = (date) => {
                let hours;
                if (date.getHours() < 10) {
                    hours = "0" + date.getHours();
                } else {
                    hours = date.getHours();
                }

                let minutes;
                if (date.getMinutes() < 10) {
                    minutes = "0" + date.getMinutes();
                } else {
                    minutes = date.getMinutes();
                }

                return `${date.getFullYear()}-${months[date.getMonth()]}-${date.getDate()}_${hours}-${minutes}`
            }

            for (date = lecture.startedOn; date <= lecture.endedOn; date = new Date(date.valueOf() + 60000)) {
                // File name (e.g. TM101-2020-04-24_12-34.mp4).
                let fileName = `${classroomId}-${formatDate(date)}.mp4`;
                if (fs.existsSync(`/usr/local/antmedia/webapps/WebRTCApp/streams/${fileName}`)) {
                        // If the stream file exists.
                        streamHistory[minute] = fileName;
                }

                minute++;
            }
            lecture.streamHistory = streamHistory;

            
            return res.status(200).json({lecture, streamHistory});
        }

        return res.status(400).json({msg: "Bad request."});
    } catch(e) {
        console.log(e);
        return res.status(500).json({msg: "Internal server error."});
    }
});

/*
@route  POST api/lectures/downloadStats
@desc   Returns a lecture's data by ID.
@access private
*/
router.post('/downloadStats', async (req, res) => {
    const { downloadTotals, classroomId } = req.body;

    const overHttp = downloadTotals.http * 100 / (downloadTotals.http + downloadTotals.p2p);
    const overTorrent = downloadTotals.p2p * 100 / (downloadTotals.http + downloadTotals.p2p);

    console.log(downloadTotals);
    console.log(`A user downloaded ${overHttp}% over HTTP in 10 seconds.`);
    console.log(`A user downloaded ${overTorrent}% over BitTorrent in 10 seconds.`);
    console.log('\n');

    try {
        // const classroom = await (await Classroom.findOne({id: classroomId})).populate('liveLecture').execPopulate();
        const classroom = await Classroom.findOne({id: classroomId});
        const lecture = await Lecture.findById(classroom.liveLecture);
        
        lecture.totalDownloads.overHttp += downloadTotals.http;
        lecture.totalDownloads.overTorrent += downloadTotals.p2p;
        await lecture.save();

        const { totalDownloads } = lecture;
        const totalOverHttp = totalDownloads.overHttp * 100 / (totalDownloads.overHttp + totalDownloads.overTorrent);
        const totalOverTorrent = totalDownloads.overTorrent * 100 / (totalDownloads.overHttp + totalDownloads.overTorrent);  

        console.log(`${totalOverHttp}% of this lectures has been downloaded over HTTP so far.`);
        console.log(`${totalOverTorrent}% of this lectures has been downloaded over BitTorrent so far.`);
        console.log('\n');
        
        return res.status(200).send();
    } catch(e) {
        console.log(e)
        return res.status(500).send(e);
    }
});

module.exports = router;