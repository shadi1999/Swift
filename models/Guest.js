const mongoose = require('mongoose');
const Schema = mongoose.Schema;


Guest= new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        defualt:Date.now
    }
});


module.exports=mongoose.model('guest',Guest);