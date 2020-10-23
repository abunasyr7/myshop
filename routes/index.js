const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require("../config/auth.js")
const title = 'test'
//login page
router.get('/welcome', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register', {title: title});
})
router.get('/dashboard',ensureAuthenticated, (req,res)=>{
    res.render('dashboard', {
        user:req.user
    });
    })

module.exports = router;