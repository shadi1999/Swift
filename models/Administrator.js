const mongoose = require('mongoose');
const User = require('./User')
const Schema = mongoose.Schema;

const AdministratorSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User.discriminator('Administrator', AdministratorSchema);