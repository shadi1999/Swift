const mongoose = require('mongoose');

/*
    A unified model for all users, including students, guest students, tutors and admins.
*/

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Email and password are not required for guest users.
  date: {
    type: Date,
    default: Date.now
  }
},
// Options:
{
    discriminatorKey: 'kind'
});

// Password hashing.
UserSchema.pre("save", function(next) {
    let user = this;

    if (!user.password) next(); // Skip if the user is a guest student.
    // if (user.kind === 'GuestStudent') next();

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    })
    .catch(error => {
        console.log(`Error in hashing password: ${error.message}`);
        next(error);
    });
});

module.exports = User = mongoose.model('user', UserSchema);
