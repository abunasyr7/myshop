const express = require ('express');
const router = express.Router();
//express app
const app = express ();
const mongoose = require('mongoose')
const expressEjsLayout = require('express-ejs-layouts')
const flash = require ('connect-flash');
const session = require ('express-session');
const passport = require('passport');
require("./config/passport")(passport)
//mongoose
mongoose.connect('mongodb://localhost/test', {useNewUrlParser:true, useUnifiedTopology: true})
.then(() => console.log('connected,,'))
.catch((err) => console.log(err));
//register view engine
app.set('view engine', 'ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(expressEjsLayout);
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));
app.use(passport.initialize());
app.use(passport.session());
//use flash
app.use(flash());
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
next();
})
//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
//listen for request
app.listen(3000, () => {
  console.log('Server is listening to the port 3000');
});

app.get('/', (req,res) =>{
    res.render('homepage', {title: 'MyShop'})
});

app.get('/about',(req, res) =>{
    res.render('about',{title: 'About'});
});

app.get('/welcome',(req, res) =>{
    res.render('welcome',{title: 'Welcome'});
});

app.get('/contact',(req, res) =>{
    res.render('contact',{title: 'Contacts'});
});

//404 page
/*app.use((req,res) =>{
    res.status(404).render('404', {title: '404'});
});*/
