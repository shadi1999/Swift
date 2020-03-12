const Classroom = require('./models/Classroom');
const Tutor = require('./models/Tutor');
const {Lecture, Attendance} = require('./models/Lecture');
const User = require('./models/User');

module.exports = async io => {
    // io.on('connection', function(socket) {
    //     socket.join(socket.classroomId);
    //     const classroom = await Classroom.findById(socket.classroomId);
    //     const lecture = classroom.liveLecture;
    //     socket.on('message', function(msg) {
    //         socket.to(socket.classroomId).emit('bc message', msg);
    //         lecture.chatMessages.push(msg);
    //         await lecture.save();
    //     });

        
    // })

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
            // io.to(classroom).emit('roomData', { classroom: user.classroom, users: getUsersInRoom(user.classroom) });
        
            // callback();
        });
      
        socket.on('sendMessage', async (msg) => {
            msg = { sender: socket.user.id, text: msg }

            socket.lecture.chatMessages.push(msg);
            await socket.lecture.save();

            io.to(classroomId).emit('message', msg);
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
            console.log(socket.classroom);
            
            let lecture = await Lecture.findById(socket.classroom.liveLecture._id, {'onlineUsers.name': 1, 'onlineUsers._id': 1}).populate('onlineUsers');
            lecture = await lecture.execPopulate();            
            let onlineUsers = lecture.onlineUsers
            console.log(onlineUsers);
            
            if(onlineUsers.length !== 0){
                onlineUsers = onlineUsers.map(user => ({_id: user._id, name: user.name, kind: user.kind}));
            }
            
            callback(Boolean(socket.classroom.liveLecture), onlineUsers);
        });
      
        socket.on('disconnect', async () => {
            let duration = Date.now() - socket.joinDate;
            let attendant = socket.classroom.liveLecture.attendance.find(a => a.user == socket.user.id);
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
            io.to(classroomId).emit('userLeft', {_id: socket.user.id });
            // const user = removeUser(socket.id);
      
            // if(user) {
            //     io.to(user.classroom).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            //     io.to(user.classroom).emit('roomData', { classroom: user.classroom, users: getUsersInRoom(user.classroom)});
            // }
        });
      });
}