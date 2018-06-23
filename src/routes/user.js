var fs = require('fs');
var User = require('../models/user');
var express = require('express');
var app = express();
var passportConf = require('../services/passport');
var passport = require('passport');
var async = require('async');
var router = require('express').Router();

const tf = require('@tensorflow/tfjs');

// Load the binding:
//require('@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

// Set the backend to TensorFlow:
//tf.setBackend('tensorflow');

var bufferEq = require('buffer-equal-constant-time');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
module.exports = function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "YOUR_URL"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

  if (req.method === "OPTIONS") {
      return res.status(200).end();
  }

  return next();
};

router.get('/login',(req,res)=>{
    if(req.user) return res.redirect('/');
    res.render('signup',{message: req.flash('loginMessage')});//, crsfToken : req.crsfToken()}); 
   
});

router.post('/login',(req,res,next)=>{
User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      return res.redirect('/profile');
    }
  });
});

router.get('/signup',(req,res,next)=>{
    res.render('signup',{
       errors: req.flash('errors')
    });
});

router.get('/',(req,res,next)=>{
  res.render('signup');
})
   
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

router.get('/profile', function (req, res, next) {
    /*User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          if (user === null) {
            res.send("no");
            var err = new Error('Not authorized! Go back!');
            err.status = 400;
            return next(err);
          } else {
return res.render('profile');          }
        }
      });*/
      return res.render('profile');
  });

  router.get('/main',(req,res,next)=>{
      res.render('main');
      
  });


  router.get('/test',(req,res)=>{
    res.render('test');
        });
router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });







module.exports = router ;