const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseCode : {
        type: String,
        required: true,
    },
    courseName : {
        type: String,
        required: true,
    },
    catOneLinks : {
        type: [String],
    } ,
    catTwoLinks : {
        type: [String],
    } ,
    FatLinks : {
        type: [String],
    }
});

module.exports = mongoose.model('courses', courseSchema);
