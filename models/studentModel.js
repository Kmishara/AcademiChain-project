const mongoose = require("mongoose");
const { unique } = require("next/dist/build/utils");

const studentSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    mail:{ type: String, required: true },
    semester:{ type: String, required: true },
    enroll:{type:String, require:true, unique:true},
    Branch:{type:String, require:true},
    Course:{type:String, require:true},
    prsnlphn:{type:Number, require:true, unique:true },
    parentsphn:{type:Number, require:true, unique:true},
    firstSem:{type:Number,require:true},
    secSem:{type:Number,require:true},
    thirdSem:{type:Number,require:true},
    fourthSem:{type:Number,require:true},
    fifthSem:{type:Number,require:true},
    sixthSem:{type:Number,require:true},
    seventhSem:{type:Number,require:true},
    marks:{type:Number, require:true},
    profilepic:{type:String },

   

})
const Student = mongoose.models.Student || mongoose.model('addStudent', studentSchema);

module.exports = Student;