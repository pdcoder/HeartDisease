const mongoose = require('mongoose');
const {Schema} = mongoose ;
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new Schema({
    email: { type: String, unique: true, lowercase:true, trim:true},
    password : String,
    name: {type:String, default:'',trim:true}

    
});

UserSchema.pre('save',function(next){
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