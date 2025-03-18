const multer = require("multer");
const path = require("path");
// const ghg = require("../public/images")
// Set storage
const fs = require("fs");

// Ensure the uploads directory exists
const uploadPath = path.join(__dirname, '../public/images/uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); // Creates the directory if it doesn't exist
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    var dt = new Date();
    var fn = Math.floor(Math.random() * 100000000) + dt.getTime() + path.extname(file.originalname);
    cb(null, fn)
  }
})
function fileFilter (req, file, cb) {

 
 if(
  file.mimetype==="image/png"|| file.mimetype==="image/jpg"|| file.mimetype==="image/jpeg" ||file.mimetype=== "image/svg "|| file.mimetype==="image/webp"
 ){
  cb(null, true)
 }

  else{
    cb(new Error('I don\'t have a clue!'))

  }
  
}

const upload = multer({ storage: storage, fileFilter:fileFilter })


module.exports = upload;
