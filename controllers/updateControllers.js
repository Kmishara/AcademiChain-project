const User = require("../models/userModels");

exports.updateProfile = async (req, res) => {
  

   const {username} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
      
        // Update user data
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.age = req.body.age || user.age;
        if (req.file) {
          user.profilepic = req.file.filename;
        }
       

         await user.save();
      //  req.session.user = updatedUser; // Update session

        res.json({ success: true, message: "Profile updated", });
    
    
};



