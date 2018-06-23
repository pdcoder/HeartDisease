const mongoose = require('mongoose');
const {Schema} = mongoose ;
var bcrypt = require('bcrypt-nodejs');


var AdminSchema = new Schema({
    email: { type: String, unique: true, lowercase:true, trim:true},
    password : {type:String, max: 100},
    name: {type:String, default:'',trim:true}

    
});


UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email : email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
           // console.log(password);
            //  console.log(user.password);
            return callback();
          }
        })
      });
  }


  UserSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('password'))
    return next();
    bcrypt.genSalt(5,(err,salt)=>{
        if (err) return next(err);
        bcrypt.hash(user.password,salt,null,(err,hash)=>{
            if (err) return next(err);
user.password= hash;
console.log(user.password);
next();
        });
    });
});



  
var User = mongoose.model('User', UserSchema);
module.exports = User;
