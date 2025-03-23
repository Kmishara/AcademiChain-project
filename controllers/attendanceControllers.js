const path = require('path');
const Student = require('../models/studentModel');
const Attendance = require('../models/attendanceModel');

exports.markAttendance = async (req, res) => {
    const { date, course, status } = req.body;

    if (!date || !course || !status) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    try {
        // Ensure date format is consistent
        // const formattedDate = new Date(date).toISOString().split('T')[0];

        // Check if attendance already exists for this date and course
        // const existingAttendance = await Attendance.findOne({ 
        //     date, // Ensure stored date matches request date
        //     course 
        // });

        // if (existingAttendance) {
        //     return res.status(400).json({ 
        //         success: false, 
        //         error: `Attendance for course "${course}" has already been marked on ${date}.` 
        //     });
        // }

        // Fetch student details based on enrollment numbers
        const studentsAttendance = await Promise.all(
            Object.entries(status).map(async ([enroll, value]) => {
                const student = await Student.findOne({ enroll });

                if (!student) {
                    return Promise.reject(new Error(`Student with enrollment number ${enroll} not found`));
                }

                return {
                    enroll: student.enroll, // Store enrollment number instead of _id
                    status: value.status === 'Present' ? 'Present' : 'Absent',
                };
            })
        );

        // Create a new attendance record
        const newAttendance = new Attendance({
            date: date,
            course,
            students: studentsAttendance,
        });

        await newAttendance.save();

        res.json({ success: true, message: 'Attendance submitted successfully' });
    } catch (err) {
        console.error('Error:', err);

        // If error contains "Student with enrollment number", return a specific message
        if (err.message.includes("not found")) {
            return res.status(400).json({ success: false, error: err.message });
        }

        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};



exports.showAttendance = async (req, res) => {
    try {
        // Fetch all attendance records
        const attendanceRecords = await Attendance.find().sort({ date: -1 });

        res.render('showAttendance', { attendanceRecords }); // Send to frontend
    } catch (err) {
        console.error('Error fetching attendance:', err);
        res.status(500).send('Error fetching attendance data');
    }
};



