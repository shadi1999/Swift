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
        default:Date.now
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

    startedOn: {
        type: Date,
        required: true
    },

    endedOn: {type: Date},

    attendance: [Attendance],

    slideUrl: {type: String},

    slideHistory: [{slideNumber: Number, date: {type: Date, default: Date.now}, slideUrl: String}],

    chatMessages:[ChatMessage],

    onlineUsers: [{type: Schema.Types.ObjectId, ref: 'user'}],

    totalDownloads: {
        overHttp: {
            type: Number,
            default: 0
        },
        overTorrent: {
            type: Number,
            default: 0
        }
    }
});

module.exports = {
    Lecture: mongoose.model('lecture', Lecture),
    ChatMessage: mongoose.model('chat-message', ChatMessage),
    Attendance: mongoose.model('attendance', Attendance)
}