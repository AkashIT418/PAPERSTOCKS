const express = require('express');
const router = express.Router();

//Importing database schemas
const schools = require('../models/schools');
const courses = require('../models/courses');

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//USED TO ADD SCHOOLS
router.post('/addschool', (req, res)=>{
    const newSchool = new schools({
        schoolName : req.body.name
    });
    newSchool.save((err, savedSchool)=>{
    if(err) throw err;
    res.json(savedSchool);
    });
    
});

//Posting a new course
router.post('/addcourse/submit', (req, res)=>{
    
    
    const linkedSchool = req.body.school;
    const courseCode = req.body.courseCode;
    const courseName = req.body.courseName;
    
    if(typeof linkedSchool === "undefined" || typeof linkedSchool === "null"){
        //pass
    }
    else if(typeof linkedSchool === "string"){
        schools.updateOne({"schoolName": linkedSchool},
            {$push: {"courses": courseCode,"courseNames": courseName}},
            (err, numAffected)=>{
                if(err){
                    console.error(err);
                    res.status(500).render('failure', {message: 'The course could not be added'})
                }
            }
        );
    }
    else {
        Array.from(linkedSchool).forEach((school)=>{
            
            schools.updateOne({"schoolName": school},
                {$push: {"courses": courseCode, "courseNames": courseName}},
                (err, numAffected)=>{
                    if(err){
                        console.error(err);
                        res.status(500).render('failure', {message: 'The course could not be added'})
                    }
                }
            );
        });
    }
    
    
    courses.find({"courseCode": req.body.courseCode}).countDocuments((err, count)=>{
        if(count == 0){
            const newCourse = new courses({
                courseCode : req.body.courseCode,
                courseName : req.body.courseName,
            });
        
            newCourse.save((err, savedCourse)=>{
            if(err) res.status(500).render('failure', {message: 'The course could not be added'})
            else{
                res.status(200).render('success', {message: 'The course has been posted successfully'});
            }
            });
        }
    
        else{
            res.status(409).render('failure', {message: 'The course already exists'});
        }
    });
    

});


//Posting a new paper
router.post('/addpaper/submit', (req, res)=>{
    //Update the document
    courses.findOne({"courseCode": req.body.courseCode}).countDocuments((err, count)=>{
        if(err) {
            console.error(err);
            res.status(409).render('failure', {message: 'The paper could not be added'})
        }
        else{
            if(count == 1){
                const examType = req.body.exam + 'Links'; 
                courses.updateOne({courseCode: req.body.courseCode},
                    {$push: {[examType]: req.body.paperLink}},
                    (err, numAffected)=>{
                        if(err){
                            console.error(err);
                            res.status(500).render('failure', {message: 'The paper could not be added'})
                        }
                    }
                );
                res.status(200).render('success', {message: 'Paper has been added successfully'});
            }
            else{
                res.status(409).render('failure', {message: 'The course does not exist'});
            }
        }
    });

});


module.exports = router;
