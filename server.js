const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');

const users=require('./routes/api/users');
const students=require('./routes/api/students');
const tutors=require('./routes/api/tutors');
const administrators=require('./routes/api/administrators');



const app = express();
// Bodyparser Middleware
app.use(bodyParser.json());


//Database congigration & connection 

const db = config.get('mongoURI');

mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
    .then(()=> console.log('Mongo DB connected...'))
    .catch(err => console.log(err));
//end of db connection


app.use('/api/users',users);
app.use('/api/students',students);
app.use('/api/tutors',tutors);
app.use('/api/administrators',administrators);


const port = process.env.PORT || 5000;

app.listen(port , ()=>console.log(`server runnig on port ${port}`))




