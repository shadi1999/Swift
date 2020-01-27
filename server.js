const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const path = require('path');


const app = express();
// Bodyparser Middleware
app.use(bodyParser.json());


//Database congigration & connection 

const db = config.get('mongoURI');

mongoose.connect(db,{ useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,})
    .then(()=> console.log('Mongo DB connected...'))
    .catch(err => console.log(err)
);



app.use('/api/users',require('./routes/api/users'));
app.use('/api/students',require('./routes/api/students'));
app.use('/api/tutors',require('./routes/api/tutors'));
app.use('/api/administrators',require('./routes/api/administrators'));


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const port = process.env.PORT || 5000;

app.listen(port , ()=>console.log(`Server started on port ${port}`))




