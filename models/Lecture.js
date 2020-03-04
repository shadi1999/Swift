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
        type: Date,
        required: true
    },
    endedOn: {type: Date},
    attendance: [{
        id: {type: Schema.Types.ObjectId, ref: 'user'},
        duration: {
            type: Number,
            default: 0
        }
    }],
    slideUrl: {type: String},
    slideHistory: [{slideNumber: Number, date: Date}],
    // streamUrl: {
    //     type: String
    // }
    chatMessages:[{
        time:{
            type:Date,
            default:Date.now()
        },
        text:String,
        sender:{type: Schema.Types.ObjectId, ref: 'user'}
    }]
});

module.exports = mongoose.model('lecture', Lecture);