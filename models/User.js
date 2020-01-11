const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        defualt:Date.now
    }
});

module.exports=User=mongoose.model('user',userSchema);