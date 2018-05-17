const mongoose = require('mongoose');
const {Schema} = mongoose ;
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new Schema({
    email: { type: String, unique: true, lovercase:true},
    password : String,
    photo : String,
    profile: {
        name: {type:String, default:''},
    }
    
});

UserSchema.pre('save',(next)=>{
    var user = this;
    if(!user.isModified('password'))
    return next();
    bcrypt.genSalt(10,(err,salt)=>{
        if (err) return next(err);
        bcrypt.hash(user.password,salt,null,(err,hash)=>{
            if (err) return next(err);
user.password= hash;
next();
        });
    });
});

UserSchema.methods.comparePassword = (password)=>
{
return bcrypt.compareSync(password,hash.password);
}

module.exports = mongoose.model('User',UserSchema);