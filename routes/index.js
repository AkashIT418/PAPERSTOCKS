const express = require('express');

const router = express.Router();

//APIs are mentioned below

router.get('/', (req, res)=>{
    res.render('index');
});


router.get('/sharepaper', (req, res)=>{
    res.render('sharepaper');
});

module.exports = router;
