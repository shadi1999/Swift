const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: date,
        required: true
    },
    endedOn: {type: date},
    attendance: [{
        id: {type: Schema.Types.ObjectId, ref: 'user'},
        duration: Number
    }],
    slideUrl: {type: String},
    slideHistory: [{slideNumber: Number, date: Date}],
    // streamUrl: {
    //     type: String
    // }
});

module.exports = mongoose.model('lecture', Lecture);