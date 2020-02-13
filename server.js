const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const path = require('path');


const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//Database congigration & connection 
const db = config.get('mongoURI');

mongoose.connect(db,{ useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,})
    .then(()=> console.log('Mongo DB connected...'))
    .catch(err => console.log(err)
);


//Routes
app.use('/api/gusets',require('./routes/api/guests'));
app.use('/api/students',require('./routes/api/students'));
app.use('/api/tutors',require('./routes/api/tutors'));
app.use('/api/administrators',require('./routes/api/administrators'));
//Auth Routes ... to be written here...
/*




*/


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/* socket.io configration ...
const http = require('http');
const io = require('socket.io')(http);

const users = {};

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});
*/

//Server port
const port = process.env.PORT || 5000;

app.listen(port , ()=>console.log(`Server started on port ${port}...`))




