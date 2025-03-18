const express = require("express");
const router = express.Router();
const { updateProfile } = require("../controllers/updateControllers");
const User = require("../models/userModels");
const path = require('path');
// Middleware to check if user is logged in
const upload = require("../utilis/multer");
router.get('/Profile',function(req,res,next){

    res.render(path.join(__dirname, '../views', 'Profile.ejs'));
   
   });
// Route to render profile page with user data
router.get("/Profile", async (req, res) => {
    try {
        // Assuming user ID is stored in session or token after login
        const userId = req.session.userId; // Adjust this based on authentication method

        if (!userId) {
            return res.status(401).send("Unauthorized: Please log in");
        }

        const user = await User.findById(userId);  // ✅ Fetch user using ID

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.render("Profile.ejs", { user });  // ✅ Send user data to frontend
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// Route to handle profile update
router.post("/Profile",upload.single("profilepic"), updateProfile);

module.exports = router;
