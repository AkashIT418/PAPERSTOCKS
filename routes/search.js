const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Mongoose model
const Course  = require('../models/courses');

router.get('/:courseCode/:examType', (req, res)=>{
    Course.findOne({courseCode: req.params.courseCode},(err, course)=>{
        if(err) res.send("404");

        const examType = req.params.examType + 'Links';
        const courseLinks = course[examType];
        if(courseLinks.length >0){
            res.render('paper', {courseLinks: courseLinks, examType: examType, schoolName: req.params.schoolName, courseCode: req.params.courseCode, empty: false});
        }
        else{
            
            res.render('paper', {courseLinks: courseLinks, examType: examType, schoolName: req.params.schoolName, courseCode: req.params.courseCode, empty: true});
        }
    });
    
});


router.post('/',(req, res)=>{
    Course.find( {"courseName": {"$regex": req.body.query, "$options": "i"} },
            function(err, result){
                if(err) console.log(err);
                console.log(req.body.query)
                if(!result || result.length == 0) res.render('search', {result: result, empty: true});
                else res.render('search', {result: result, empty: false});
            }
    );
});

module.exports = router;
