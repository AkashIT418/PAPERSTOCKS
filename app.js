const express = require('express');
const mongoose = require('mongoose');

require('dotenv/config');

//ROUTES
const index = require('./routes/index');
const admin = require('./routes/admin');
const courses = require('./routes/courses');
const search = require('./routes/search');


//Set up express app
const app = express();

//Setup body parser for post requests
app.use(express.json());
app.use(express.urlencoded({extended :true}));

//Route middlewares
app.use('/', index);
app.use('/admin', admin);
app.use('/courses', courses);
app.use('/search', search);

//Set up a middleware
app.use(express.static('public'));

//Set up template engine
app.set('view engine', 'ejs');



//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{
     console.log(`Connected to DB`)
 }).catch(err=>{
     console.log(`DB error ${err.message}`);
     process.exit(-1)
 });


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Listening to port");
});
