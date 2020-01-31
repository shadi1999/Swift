const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class Guest{
    constructor(){
        
    }
    
    
}

Guest.model= new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        defualt:Date.now
    }
});


module.exports=guest=mongoose.model('guest',Guest.model);