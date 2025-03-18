const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
  addstudentsUser,
  getTotalStudents,
} = require("../controllers/studentControllers");

const Student = require("../models/studentModel");
const upload = require("../utilis/multer");
const path = require("path");
router.get("/dashboard", async (req, res) => {
  res.render(path.join(__dirname, "../views", "dashboard.ejs"));
});

router.get("/dashboard", async (req, res) => {
  //res.render(path.join(__dirname, '../views', 'dashboard.ejs'));
  try {
    const students = await Student.find(); // Fetch students from the database
    res.render(path.join(__dirname, "../views", "dashboard.ejs", { students }));
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).send("Failed to load dashboard.");
  }
});
router.post("/add", upload.single("profilepic"), addstudentsUser);

router.get("/add", (req, res) => {
  res.render(path.join(__dirname, "../views", "dashboard.ejs"));
  // res.send('GET request to /add successful')
});


router.get("/feed", function (req, res, next) {
  Student.find().then(function (allusers) {
    res.render("allusers", { allusers });
  });
});
router.get("/search", async (req, res) => {
  try {
    const { enroll } = req.query;
    console.log("Query Parameters:", req.query); // Log the entire query object
    console.log("Enroll:", enroll); // Log just the enroll parameter

    if (!enroll) {
      return res.status(400).json({ message: "Enrollment number is required" });
    }

    const student = await Student.findOne({ enroll }); // Find the student in the database
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student); // Send the student details as JSON
  } catch (error) {
    console.error("Error searching for student:", error.message);
    res.status(500).json({ message: "Failed to search for student" });
  }
});

router.get("/total-students", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments(); // Count all student documents
    res.status(200).json({ total: totalStudents });
  } catch (error) {
    console.error("Error fetching total students:", error.message);
    res.status(500).json({ message: "Failed to fetch total students" });
  }
});
router.get("/filter", (req, res) => {
  res.render("filter", { student: null, error: null });
});
router.post("/filter", async (req, res) => {
  try {
    const { enroll } = req.body;
    const student = await Student.findOne({ enroll });

    if (!student) {
      return res.render("filter", {
        student: null,
        error: "Student not found",
      });
    }

    const isWeak = student.marks < 5;
    const isAvg = student.marks >= 5 && student.marks < 8;
    res.render("filter", { student, isWeak, isAvg, error: null });
  } catch (err) {
    res.render("filter", { student: null, error: "An error occurred" });
  }
});

router.get("/update/:id", async (req, res) => {
  try {
    console.log("Received ID:", req.params.id); // Debugging

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid ObjectId");
    }

    const user = await Student.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );

    if (!user) {
      console.log(`User with ID ${req.params.id} not found in database.`);
      return res.status(404).send("User not found");
    }

    res.render(path.join(__dirname, "../views", "updateuser.ejs"), { user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Server error");
  }
});

router.post("/update/:id", upload.single("profilepic"), async (req, res) => {
  try {
    console.log("Received update request:", req.body); // Debugging

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student ID" });
    }

    // Get form data
    const {
      name,
      mail,
      enroll,
      Branch,
      Course,
      semester,
      prsnlphn,
      parentsphn,
      marks,
      firstSem,
      secSem,
      thirdSem,
      fourthSem,
      fifthSem,
      sixthSem,
      seventhSem,
    } = req.body;

    // Handle profile pic update
    let profilePicPath = req.body.profilepic;
    if (req.file) {
      profilePicPath = req.file.filename; // If new file is uploaded
    }

    // ✅ Update student data
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          mail,
          enroll,
          Branch,
          Course,
          semester,
          prsnlphn,
          parentsphn,
          firstSem,
          secSem,
          thirdSem,
          fourthSem,
          fifthSem,
          sixthSem,
          seventhSem,
          marks,
          profilepic: profilePicPath, // Save new profile pic if updated
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    console.log("Updated student:", updatedStudent);

    // ✅ Redirect to the updated profile page after successful update
    // res.redirect(`/update/${id}`);
    res.status(200).json({ updatedstudents: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ success: false, message: "Error updating student" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Student.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
