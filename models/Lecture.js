const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lecture = new Schema({
    startedOn: {
        type: date,
        required: true
    },
    endedOn: {type: date},
    attendance: [{
        id: {type: Schema.Types.ObjectId, ref: 'user'},
        enteredOn: Date,
        leftOn: Date
    }],
    // liveAttendants: [{type: Schema.Types.ObjectId, ref: 'user'}],
    slideUrl: {type: String},
    slideHistory: [{slideNumber: Number, date: Date}]
});

module.exports = mongoose.model('lecture', Lecture);