const Classroom = require('./models/Classroom');
const Tutor = require('./models/Tutor');
const {Lecture, Attendance} = require('./models/Lecture');
const User = require('./models/User');
const mongoose = require('mongoose');

module.exports = async io => {
    let socketIds = {};
    let bannedUsers = [];

    io.on('connect', async (socket) => {
        let classroomId = socket.handshake.query.classroom;
        socket.classroom = await (await Classroom.findOne({id: classroomId})).populate('liveLecture').execPopulate();
        socket.join(classroomId);

        socket.on('join', async (data) => {
            // TODO: add error handling.
            socket.classroom = await (await Classroom.findOne({id: classroomId})).populate('liveLecture').execPopulate(); 
            let attendant = socket.classroom.liveLecture.attendance.find(a => a.user == socket.user.id);
            if (!attendant) {
                socket.classroom.liveLecture.attendance.push({user: socket.user.id});
            }

            socket.lecture = socket.classroom.liveLecture;
            
            socket.joinDate = Date.now();

            socket.lecture.onlineUsers.push(socket.user.id);
            await socket.lecture.save();

            let user = await User.findById(socket.user.id, {'name': 1});
            io.to(classroomId).emit('userJoined', user);
            
            socketIds[user._id] = socket.id;
        });
      
        socket.on('sendMessage', async (msg) => {
            if (!bannedUsers.includes(socket.user.id)) {
                msg = { ...msg, sender: socket.user.id }

                socket.classroom.liveLecture.chatMessages.push(msg);
                await socket.classroom.liveLecture.save();
                
                io.to(classroomId).emit('message', msg);
            }
        });

        socket.on('uploadSlides', async (url) => {
            const tutor = await Tutor.findById(socket.user.id);
            if(tutor) {
                socket.classroom.liveLecture.slideUrl = url;

                // For replaying the recording of the lecture.
                socket.classroom.liveLecture.slideHistory.push({
                    slideNumber: 1,
                    date: Date.now(),
                    slideUrl: url
                });
                await socket.classroom.liveLecture.save();

                io.to(classroomId).emit('slidesUploaded', url);
            }
        });

        socket.on('changeSlidesPage', async pageNumber => {
            socket.classroom.liveLecture.slideHistory.push({
                slideNumber: pageNumber,
                date: Date.now(),
                slideUrl: socket.classroom.liveLecture.slideUrl
            });
            await socket.classroom.liveLecture.save();

            socket.to(classroomId).emit('slidesPageChanged', pageNumber);
        });

        socket.on('startLecture', async () => {      
            const tutor = await Tutor.findById(socket.user.id);
            if(tutor) {
                io.to(classroomId).emit('startLecture');
            }
        });

        socket.on('stopLecture', async () => {      
            const tutor = await Tutor.findById(socket.user.id);
            if(tutor) {
                io.to(classroomId).emit('stopLecture');
            }
        });

        socket.on('loadLecture', async (data, callback) => {
            socket.classroom = await (await Classroom.findOne({id: classroomId})).populate('liveLecture').execPopulate(); 
            
            let onlineUsers = [];
            let slideUrl = "";
            if(socket.classroom.liveLecture) {
                let lectureId = socket.classroom.liveLecture._id;
                let lecture = await Lecture.findById(lectureId, {'onlineUsers.name': 1, 'onlineUsers._id': 1, 'slideUrl': 1}).populate('onlineUsers');
                lecture = await lecture.execPopulate();   

                onlineUsers = lecture.onlineUsers
                if(onlineUsers.length !== 0){
                    onlineUsers = onlineUsers.map(user => ({_id: user._id, name: user.name, kind: user.kind}));
                }

                slideUrl = lecture.slideUrl;
            }

            callback(Boolean(socket.classroom.liveLecture), slideUrl, onlineUsers);
        });

        socket.on('allowStudent', async ({to, token}) => {
            const tutor = await Tutor.findById(socket.user.id);
            if(tutor) {
                io.to(socketIds[to]).emit('sendPublishToken', {token});
                io.to(classroomId).emit('streamerChanged', {newStreamer: to});
            }
        });
        socket.on('disallowStudent', async ({to}) => {
            const tutor = await Tutor.findById(socket.user.id);
            if(tutor) {
                // TODO: remove publishToken form student.
                io.to(classroomId).emit('streamerChanged', {newStreamer: socket.user.id});
            }
        });

        socket.on('raiseHand', () => {
            // Send the ID of the student who raised their hand to the tutor of the classroom.
            io.to(socketIds[socket.classroom.tutor]).emit('handRaised', {user: socket.user.id});
        });

        socket.on('banStudentFromChat', async ({userId}) => {
            const tutor = await Tutor.findById(socket.user.id);
            if(tutor) {
                bannedUsers.push(userId);
            }
        });
        
      
        const leave = async () => {
            if(socket.lecture) {
                let duration = Date.now() - socket.joinDate;
                let attendant = socket.lecture.attendance.find(a => a.user == socket.user.id);
                attendant.duration = attendant.duration + duration;
                await Lecture.findOneAndUpdate({"_id":socket.lecture._id,"attendance.user":attendant.user},
                {
                    "$set":{
                        "attendance.$.duration": attendant.duration
                    }
                });
                await Lecture.findOneAndUpdate({"_id":socket.lecture._id},
                {
                    "$pull":{
                        "onlineUsers": socket.user.id
                    }
                });    
            }
            io.to(classroomId).emit('userLeft', {_id: socket.user.id });
        }

        socket.on('leave', leave);

        socket.on('disconnect', leave);
      });
}