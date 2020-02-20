const mongoose = require('mongoose');
const Schema = mongoose.Schema;


Administrator = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        defualt:Date.now
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        isRequired:true
    }
});

module.exports=mongoose.model('administrator',Administrator);