var fs = require('fs');
var User = require('../models/user');
var express = require('express');
var app = express();
var request = require('request');
var passportConf = require('../services/passport');
var passport = require('passport');
var async = require('async');
var router = require('express').Router();
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
//tf.setBackend('tensorflow');
const https = require('https');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 /*
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
};*/

router.get('/',(req,res,next)=>{
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
   //  return next();
    } else {
      if (user === null) {
     return res.render('signup');
       // var err = new Error('Not authorized! Go back!');
       //return next(err);

      // return next();
      } else {
        console.log(req.session.userId);
        return res.render('profile',{name:user.name});
      }
 
}
  });
});

router.post('/login',(req,res,next)=>{
User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
     // console.log(req.session.userId);
      return res.redirect('/profile');
    }
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
            //req.flash('errors','Account with that email already exists');
            res.send("Exists");
            return res.redirect('/');
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
    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
         // return next(error);
       //  return next();
        } else {
          if (user === null) {
            console.log(req.session);
            return res.redirect('/');
      

          // return next();
          } else {

           return res.render('profile',{name:user.name}); 
     }
        }
      });
  });

  router.get('/main', function (req, res, next) {
    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
         // return next(error);
       //  return next();
        } else {
          if (user === null) {
            console.log(req.session);
            return res.redirect('/');
      

          // return next();
          } else {

           return res.render('main',{tensor:""}); 
     }
        }
      });
  });


  router.post('/main',(req,res,next)=>{
const model1 = tf.loadModel('file://src/public/model/model.json').then(function(mod){
var age = req.body.age;
if(req.body.sex==="Male")
var sex = 1;
else
var sex = 0;
console.log(sex);
if(req.body.cp==="Typical angina")
var cp =1;
else if(req.body.cp==="Atypical angina")
var cp =2;
else if(req.body.cp==="Non-anginal pain")
var cp =3;
else
var cp =4;
var bps = req.body.bps;
var chol = req.body.chol
if(req.body.fbs>=120)
var fbs = 1;
else
var fbs = 0;
if(req.body.restecg==="Normal")
var restecg = 0;
else if(req.body.restecg==="Having ST-T wave abnormality")
var restecg = 1;
else
var restecg =2;
var thalach = req.body.thalach;
if(req.body.exang==="Yes")
var exang = 1;
else
var exang = 0;
console.log(exang);

var oldpeak = req.body.oldpeak;
if(req.body.slope==="Upsloping")
var slope = 1;
else if(req.body.slope==="Flat")
var slope = 2;
else
var slope = 3;
console.log(slope);

var ca = req.body.ca;
if(req.body.thal==="Normal")
var thal = 3;
else if(req.body.thal==="Fixed Defect")
var thal = 6;
else
var thal = 7;
console.log(thal);

const a = (age-54.859030837004404)/9.081978327339046;   //60.0,1.0,4.0,130.0,206.0,0.0,2.0,132.0,1.0,2.4,2.0,2.0,7.0,4
  const b = (sex-0.6916299559471366)/0.4618202680520838;
  const c = (cp-3.198237885462555)/0.971123367751433;
  const d = (bps-132.1762114537445)/17.38004216977418;
  const e = (chol-247.98237885462555)/52.54685048280854;
  const f =  (fbs-0.14977973568281938)/0.35685538592209004;
  const g =  (restecg-1.0308370044052864)/0.9906704466091945;
  const h = (thalach-147.22466960352423)/23.57680689000789;
  const i = (exang-0.3392070484581498)/0.473440203969265;
  const j = (oldpeak-1.0541850220264315)/1.1268519250198914;
  const k = (slope-1.6255506607929515)/0.6053062215794779;
  const l = (ca-0.6563876651982379)/0.9273101593609425;
  const m = (thal-4.823788546255507)/1.9315962468937902;
  const test = tf.tensor([[a,b,c,d,e,f,g,h,i,j,k,l,m]]);
  
  var tensor = mod.predict(test).argMax(1);
  res.render('main',{tensor:String(tensor).substring(8)});
}).catch(function(err)
{
    console.log(err);
});

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