const Classroom = require('./models/Classroom');
const Tutor = require('./models/Tutor');

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

        socket.on('join', async (data, callback) => {
            // TODO: add error handling.
            console.log(socket.classroom);
            
            socket.classroom.liveLecture.attendance.push({id: socket.user._id});

            socket.lecture = socket.classroom.liveLecture;
            socket.joinDate = Date.now();
        
            // socket.broadcast.to(classroom).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        
            // io.to(classroom).emit('roomData', { classroom: user.classroom, users: getUsersInRoom(user.classroom) });
        
            callback();
        });
      
        socket.on('sendMessage', async (msg, callback) => {
            msg = { sender: socket.id, text: msg }

            socket.lecture.chatMessages.push(msg);
            await socket.lecture.save();

            io.to(classroomId).emit('message', msg);

            callback();
        });

        socket.on('startLecture', async () => {      
            const tutor = await Tutor.findById(socket.user.id);
            if(tutor) {
                io.to(classroomId).emit('startLecture');
            }
        });
      
        socket.on('disconnect', async () => {
            let duration = Date.now() - socket.joinDate;
            let attendant = socket.classroom.liveLecture.attendance.findOne({id:socket.id})
            attendant.duration = user.duration + duration;
            await attendant.save();
            // const user = removeUser(socket.id);
      
            // if(user) {
            //     io.to(user.classroom).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            //     io.to(user.classroom).emit('roomData', { classroom: user.classroom, users: getUsersInRoom(user.classroom)});
            // }
        });
      });
}