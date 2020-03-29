const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const fs = require('fs');
const app = express();

// SSL files
const cert = fs.readFileSync('./ssl/swiftcourse-cert.crt');
const key = fs.readFileSync('./ssl/private-key.pem');

// Middleware
app.use(express.json({
  extended: true
}));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));

// Database connection 
const db = config.get('mongoURI');

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => console.log('Mongo DB connected...'))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'x-auth-token,content-type,x-requested-with');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
  });
} else {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'x-auth-token,content-type,x-requested-with');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
  });
}

// Routes
app.use('/api/files', require('./routes/api/files'));
app.use('/api/students', require('./routes/api/students'));
app.use('/api/tutors', require('./routes/api/tutors'));
app.use('/api/administrators', require('./routes/api/administrators'));
app.use('/api/classrooms', require('./routes/api/classrooms'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// socket.io configuration ...
const socket = require('./socket');
let http;
if (process.env.NODE_ENV !== 'production') {
  http = require('http').Server(app);
} else {
  http = require('https').Server({
    cert,
    key
  }, app);
}
const io = require('socket.io')(http);
const socketAuth = require('./middleware/socket.io/auth');
// Authenticate every socket connection user.
io.use(socketAuth);
socket(io);

// Server port
let port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  port = 443;

  // redirect to https.
  app.use((req, res, next) => {
    if (req.protocol === 'http') {
      res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

http.listen(port, () => console.log(`Server started on port ${port}...`))