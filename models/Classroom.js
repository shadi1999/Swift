const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Classroom = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'Tutor'
    },
    // chat: ...
    private: {
        type: Boolean,
        required: true
    },
    liveLecture: {
        type: Schema.Types.ObjectId,
        ref: 'lecture'
    },
    pastLectures: [{
        type: Schema.Types.ObjectId,
        ref: 'lecture'
    }],
    recordLectures: {
        type: Boolean,
        default: true
    },
    mediaServerApp: {
        type: String
    }
});

module.exports = mongoose.model('classroom', Classroom);