const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

require('dotenv').config();
const mongoose = require('mongoose');  
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const db = require('./config/keys').MongoURI;
require('./config/passport')(passport);
// Connect to MongoDB
mongoose
  .connect(
     db ,
    { useNewUrlParser: true ,
     useUnifiedTopology: true }
  )
.then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.use(express.static('public'))
 
app.use(expressLayouts)
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));