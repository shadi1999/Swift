const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attendance = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    duration: {
        type: Number,
        default: 0
    }
});

const ChatMessage = new Schema({
    time: {
        type:Date,
        default:Date.now()
    },
    type: String,
    text: String,
    sender: {type: Schema.Types.ObjectId, ref: 'user'}
});

const Lecture = new Schema({
    live: {
        type: Boolean,
        default: true
    },
    // status: {
    //     type: String,
    //     enum: ['live', 'ended', 'recorded']
    // }
    startedOn: {
        type: Date,
        required: true
    },
    endedOn: {type: Date},
    attendance: [Attendance],
    slideUrl: {type: String},
    slideHistory: [{slideNumber: Number, date: Date}],
    // streamUrl: {
    //     type: String
    // }
    chatMessages:[ChatMessage],
    onlineUsers: [{type: Schema.Types.ObjectId, ref: 'user'}]
});

module.exports = {
    Lecture: mongoose.model('lecture', Lecture),
    ChatMessage: mongoose.model('chat-message', ChatMessage),
    Attendance: mongoose.model('attendance', Attendance)
}