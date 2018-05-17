var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user);
    });
});

passport.use('local-login', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,email,password,done)=>{
User.findOne({email:email},(err,user)=>{
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