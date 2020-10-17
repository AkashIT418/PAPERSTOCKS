const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {registerValidation, loginValidation} = require('../validate');

//Middleware for cookies
router.use(cookieParser());
  

router.post('/register',async (req,res)=>{

    //Validating data
    const { error, value } = registerValidation(req.body);
    if (error) return res.status(400).render('forbidden',{message: error.details[0].message});
    
    //Check if user already exists

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).render('forbidden',{message: 'Email already exists'});

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    try{
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch(err){
        res.status(400).render('forbidden', {message: 'Some error occurred while signing up'});
    }

  
    
});

router.post('/login', async (req, res)=>{
    const {error} = loginValidation(req.body);

    if (error) return res.status(400).render('forbidden', {message: error.details[0].message});
    
    //Check if user already exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).render('forbidden', {message: 'Invalid email'});
    //Password is correct

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).render('forbidden', {message: 'Invalid Password'});

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.cookie('token', token, {expire: 900000 + Date.now()}).redirect('../adminPanel');

});
module.exports = router;
