var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Sweta_42:sweta_118@cluster0.nx1xk.mongodb.net/clg-2");
 var userSchema = mongoose.Schema({
    username:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true },
    age:{type:String} ,
    profilepic:{type:String },
   
  
});
module.exports = mongoose.model("student", userSchema);


