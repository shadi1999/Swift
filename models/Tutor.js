const mongoose = require('mongoose');
const User = require('./User')
const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    classrooms: [{ type: Schema.Types.ObjectId, ref: 'classroom' }]
});

module.exports = User.discriminator('Tutor', TutorSchema);