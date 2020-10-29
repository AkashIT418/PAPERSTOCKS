const express = require('express');
const mongoose = require('mongoose');

require('dotenv/config');

//ROUTES
const index = require('./routes/index');
const admin = require('./routes/admin');
const courses = require('./routes/courses');
const search = require('./routes/search');
var dir = 'C:\\Users\\ARAVINTHAN P\\Desktop\\paperstock-master'
var path = require('path')
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
app.use(express.static(path.join(dir, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(dir, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//Set up template engine
app.set('view engine', 'ejs');



//CONNECT TO DB
mongoose.connect("mongodb://localhost:27017/", {
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
