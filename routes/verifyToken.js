const router = require('express').Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


//Middlewares
router.use(cookieParser());

module.exports = function (req, res, next) {
    
    const token = req.cookies.token;
    if(!token) return   res.status(403).render('forbidden', {message: 'Access Denied, Please login'});
    
    try {
         jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
            req.user = decoded;
        });
        next();
    } catch( err ) {
        res.status(400).render('forbidden', {message: 'Invalid token'});
    }
}
