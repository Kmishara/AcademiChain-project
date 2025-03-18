var express = require('express');
var path = require('path');
var app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

var indexRouter = require('./Routes/userRoutes');
// var profileRouter = require('./routes/profileRoutes');
 var studentRouter = require("./routes/studentRoutes");
// var attendanceRoutes = require("./routes/attendanceRoutes");
app.use(session({
  secret: "your_secret_key", 
  resave: false,
  saveUninitialized: true
}));
app.use((req, res, next) => {
  res.locals.user = req.session.userId ? req.session.userId : null; // Make user available in EJS
  next();
});
app.use('/', indexRouter);
// app.use('/profile', profileRouter);
 app.use('/search', studentRouter);
app.use('/students', studentRouter);
app.use('/update/:id', studentRouter);
app.use('/dashboard', indexRouter);
app.use('/', studentRouter);
// app.use('/', attendanceRoutes);
// app.use('/attendance', attendanceRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});
app.get('/Profile', (req, res) => {
  res.render('Profile',);
});
app.get("/session-check", (req, res) => {
  res.json({ session: req.session });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;
