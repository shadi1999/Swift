const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ClassRoom = new Schema({
    name:{
        type:String,
        required:true
    },
    students: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    tutor: {type: Schema.Types.ObjectId, ref: 'tutor'},
    // chat: ...
    Private: {
        type:Boolean
    }
});

module.exports=mongoose.model('classroom', ClassRoom);