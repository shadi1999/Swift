const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class Tutor{
    constructor(){
        
    }
}

Tutor.model = new Schema({
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

module.exports=mongoose.model('tutor',Tutor.model);