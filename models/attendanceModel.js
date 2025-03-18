const mongoose = require("mongoose");
const studentSchema = require("./studentModel");

const attendanceSchema = new mongoose.Schema({
    date: { type: Date, required: true }, // Date of attendance
    course: { type: String, required: true }, // Course name
    // students: [
    //     {
    //         // studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Student reference
    //         status: { type: String, enum: ['Present', 'Absent'], required: true }, // Present or Absent
    //     },
    // ],
    students: [
        {
            enroll: { type: String, required: true }, // Reference to Enroll schema
            status: { type: String, enum: ['Present', 'Absent'], required: true },
        },
    ],
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;


