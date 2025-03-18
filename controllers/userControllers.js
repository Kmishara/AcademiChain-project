const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
// const{jwtAuthMiddlware,generateToken} = require('../utilis/jwt');
// require("dotenv").config();

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
const response = await newUser.save();
const payload = {
  id:response.id,
  username:response.username
}
console.log(JSON.stringify(payload));
// const token = generateToken(payload);
// console.log("Token is :",token);
res.redirect('./login')
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Registration failed. Please try again later." });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await User.findOne({username});
  if (!user) {
    return res.status(400).json({ message: "invalid useraname" });
  }
    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    } 
  //  req.session.user = { _id: user._id, username: user.username, email: user.email };

  const payload = {
    id : user.id,
    username:user.username
  }
  console.log(payload)
  // const token = generateToken(payload)
  // console.log(token)
  req.session.userId = { _id: user._id,
    username: user.username,
  };
  console.log(user.username);
//  res.redirect("/dashboard",)
 res.render('dashboard', { user: user});
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

