/*const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const keys = require('../config/keys');

/*passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret : keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    },(accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    }));



    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });
    
    passport.deserializeUser((id,done)=>{
        User.findById(id, (err,user)=>{
            done(err,user);
        });
    });
    
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
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
    */