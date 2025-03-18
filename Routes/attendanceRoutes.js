const express = require('express')
const router = express.Router();
const {markAttendance,showAttendance} = require('../controllers/attendanceControllers');
const path = require('path');
const Student = require('../models/studentModel');

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
module.exports = router;