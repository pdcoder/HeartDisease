
var User = require('../models/user');
var express = require('express');
var app = express();
var passportConf = require('../services/passport');
var passport = require('passport');
var async = require('async');
var router = require('express').Router();



router.get('/login',(req,res)=>{
    if(req.user) return res.redirect('/');
    res.render('login',{message: req.flash('loginMessage')});//, crsfToken : req.crsfToken()}); 
   
});



router.post('/login',passport.authenticate('local-login',{
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
}));

router.get('/signup',(req,res,next)=>{
    res.render('signup',{
       errors: req.flash('errors')
    });
});

router.get('/profile',passportConf.isAuthenticated,(req,res,next)=>{
    User.findOne({_id:req.user._id})
    .exec((err,founduser)=>{
        if (err) return next(err);
        res.render('profile',{user:founduser});
    });
});

router.get('/signup',(req,res,next)=>{
    res.render('signup',{
        errors:req.flash('erors')
    });
});
   
router.post('/signup',(req,res,next)=>{
    async.waterfall([(callback)=>{
        var user = new User();
        user.email= req.body.email;
        user.password = req.body.password;
        user.name = req.body.name;

        User.findOne({email:req.body.email},(err,existinguser)=>{
            if(existinguser){
            req.flash('errors','Account with that email already exists');
            return res.redirect('/signup');
        }else{
            user.save((err,user)=>{
                console.log("nserted");

                if (err) {
                    console.log(err);
                    return (err);
                }
                callback(null,user);
            });
        }
    });
}]);
});

router.get('/logout',(req,res,next)=>{
    req.logout();
    res.redirect('/');

});

module.exports = router ;