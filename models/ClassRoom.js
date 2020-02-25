const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Classroom = new Schema({
    id: {
        type:String,
        required:true
    },
    students: [{ type: Schema.Types.ObjectId, ref: 'student' }],
    tutor: {type: Schema.Types.ObjectId, ref: 'tutor'},
    // chat: ...
    private: {
        type:Boolean
    },
    liveLecture: {type: Schema.Types.ObjectId, ref: 'lecture'},
    pastLectures: [{type: Schema.Types.ObjectId, ref: 'lecture'}],
    recordLectures: {
        type: Boolean,
        default: ture
    }
});

module.exports=mongoose.model('classroom', Classroom);