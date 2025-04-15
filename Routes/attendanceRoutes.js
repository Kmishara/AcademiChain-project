const express = require('express')
const router = express.Router();
const {markAttendance,showAttendance} = require('../controllers/attendanceControllers');
const path = require('path');
const Student = require('../models/studentModel');
const Attendance = require('../models/attendanceModel');

 //router.get('/attendance',markAttendance);
 router.get('/attendance', async (req, res) => {
    try {
        // Fetch all enrolled students from the Enroll collection
        const students = await Student.find();

       
        res.render('attendance', { students});
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error loading attendance page');
    }
});
router.post('/attendance', markAttendance);
router.get('/show-attendance', showAttendance);
// Get today's attendance count
router.get("/today-attendance", async (req, res) => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
  
      // Fetch today's attendance records
      const todayRecords = await Attendance.find({
        date: { $gte: startOfDay, $lte: endOfDay },
      });
  
      // Object to store course-wise counts
      const courseWiseCounts = {};
  
      todayRecords.forEach(record => {
        const course = record.course;
  
        // Initialize the course key
        if (!courseWiseCounts[course]) {
          courseWiseCounts[course] = 0;
        }
  
        // Count present students for this course
        record.students.forEach(student => {
          if (student.status === 'Present') {
            courseWiseCounts[course]++;
          }
        });
      });
  
      res.status(200).json({ success: true, data: courseWiseCounts });
    } catch (error) {
      console.error("Error fetching today's attendance:", error.message);
      res.status(500).json({ success: false, message: "Failed to fetch today's attendance" });
    }
  });
  
  

module.exports = router;