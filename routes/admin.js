const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const cookieParser = require('cookie-parser');


//Middlewares
router.use(cookieParser());

//Routes
const auth = require('./auth');
const post = require('./post');


//Route middlewares
router.use('/post', post);  //Used for posting courses and papers
router.use('/auth', auth); //Used for login and register



//Rendering views for admin panel
router.get('/',  (req, res)=>{
    if(req.cookies.token) res.redirect('/admin/adminPanel');
    else  res.status(200).render('login');
});

router.get('/adminPanel',  verify, (req, res) => {
    res.status(200).render('admin');
});

router.get('/addcourse', verify, (req, res)=>{
    res.status(200).render('addcourse');
});

router.get('/addpaper', verify,  (req, res)=>{
    res.status(200).render('addpaper');
});


module.exports = router;
