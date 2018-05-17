var router = require('express').Router();
var passport = require('passport-local').Strategy;


router.get('/login',(req,res)=>{
    if(req.user) return res.redirect('/');
    res.render('login',{message: req.flash('loginMessage')}); 
});

router.post('/login',passport.authenticate('local-login',{
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash: true
}),(req,res,next)=>{
return next();
});

router.get('/signup',(req,res,next)=>{
    res.render('signup',{
        errors: req.flash('errors')
    });
});


router.post('/signup', (req,res,next)=>{
    var user= new User();
    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    User.findOne({email: req.body.email}, (err,existinguser)=>{
    if(existinguser){
     req.flash('errors','Account with that email address already exists');
    }
    else{
    user.save((err,user)=>{
    if (err)
    return next(err);

    res.json("new user created");
});
    }
});
});

router.get('/profile',(req,res,next)=>{
    if (err) return  next(err);
    res.render('profile',{user:user});
    });
    
    
    module.exports = router ;