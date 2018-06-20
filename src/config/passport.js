var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto-js');


passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user);
    });
});

passport.use('local-login', new localStrategy({
    usernameField : 'prakash1998@gmail.com',
    passwordField: '$2a$10$4eYOHfbbYdzqoPY4iTrxJeIrmu821M7FFZATL122VS5.HHnBDVNdm',
    passReqToCallback: true
}, (req,email,password,done)=>{
User.findOne({email:usernameField},(err,user)=>{
    if (err) return done(err);
    
    if(!user){
        return done(null,false,req.flash('loginMessage','No user has been found'));
    }
   
    if(!user.comparePassword(password)){
        return done(null,false,req.flash('loginMessage','Wrong password'));
    }
    
    return done(null,user);
});
}));

exports.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}