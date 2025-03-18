const express = require('express');
const router = express.Router();
const User = require('../models/userModels')

const {registerUser,loginUser,getUserProfile,updateUserProfile} = require("../controllers/userControllers")
const path = require('path');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/login', (req, res) => {
    res.render(path.join(__dirname, '../views', 'index.ejs'));
  });
  router.get('/register', (req, res) => {
    res.render(path.join(__dirname, '../views', 'index.ejs'));
  });
  // router.get('/Profile',function(req,res,next){

  //   res.render(path.join(__dirname, '../views', 'Profile.ejs'));
   
  //  });
  router.get('/dashboard', (req, res) => {
    // Assuming you store the user information in req.user (after successful login)
    const user = req.user || null; // If user is not logged in, set it to null
  
    res.render('dashboard', { user });
  });
  
module.exports = router;