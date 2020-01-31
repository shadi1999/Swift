const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const guestSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        defualt:Date.now
    }
});

module.exports=User=mongoose.model('guest',guestSchema);