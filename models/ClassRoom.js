const mongoose = require('mongoose');
const Schema = mongoose.Schema;


ClassRoom = new Schema({
    name:{
        type:String,
        required:true
    },
    students: [{ type: Schema.Types.ObjectId, ref: 'student' }],
    guests: [{ type: Schema.Types.ObjectId, ref: 'guest' }],
    tutor: {type: Schema.Types.ObjectId, ref: 'tutor'},
    /*time:{ type:Date,
    required:true
    },
    extraTime:{ type:Date },*/
    Private:{
        type:Boolean
    }

});

module.exports=mongoose.model('classroom',ClassRoom);