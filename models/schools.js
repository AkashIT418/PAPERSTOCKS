const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
   schoolName: {
       type:String,
       required: true,
   } ,
   courses: {
       type: [String],
   } ,
   courseNames: {
       type: [String],
   }
});

module.exports = mongoose.model('schools', schoolSchema);
