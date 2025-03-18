const Student = require("../models/studentModel");
// const multer = require("../utilis/multer")


exports.addstudentsUser = async (req, res) => {
  
    try {
        const { name, mail, semester,Branch,Course, enroll, prsnlphn, parentsphn, marks, firstSem,
        secSem,
        thirdSem,
        fourthSem,
        fifthSem,
        sixthSem,
        seventhSem }= req.body;
        
       
        // Validate input fields
        if (!name || !mail || !semester || !enroll || !Branch || !Course || !prsnlphn || !parentsphn || !firstSem ||!secSem || !thirdSem || !fourthSem ||!fifthSem ||!sixthSem || !seventhSem || !marks || !req.file) {
          return res.status(400).json({ message: "All fields are required." });
        }
        
        // Validate file upload
       
    
        // Check if the student with the given email already exists
        const existingStudent = await Student.findOne({ mail });
        if (existingStudent) {
          return res.status(400).json({ message: "Student with this email already exists." });
        }
    
   
    
        // Create a new student document
        const newStudent = new Student({
          name,
          mail,
          semester,
          Branch,Course,
          enroll,
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
          profilepic:req.file.filename,
        });
    
        // Save the student to the database
        await newStudent.save();
    
        res.status(201).json({ message: "Student added successfully!" });
      } catch (error) {
        console.error("Error adding student:", error.message);
        res.status(500).json({ message: "Failed to add student. Please try again later." });
      }
    };
//}
 
 
exports.getTotalStudents = async (req, res) => {
    try {
        // Count the total number of students
        const totalStudents = await Student.countDocuments();
        res.status(200).json({ totalStudents });
    } catch (error) {
        console.error('Error fetching total students:', error.message);
        res.status(500).json({ message: 'Failed to fetch total students. Please try again later.' });
    }
};



