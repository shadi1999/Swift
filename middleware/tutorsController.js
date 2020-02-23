/*
The Tutor has the actual same data as the Student...
*/
const studentController = require('./studentsController');
const Tutor = require('../models/Tutor');

studentController.create = (data) => {                                              
    const tutor = new Tutor(data);
    tutor.save();
}

module.exports=studentController;