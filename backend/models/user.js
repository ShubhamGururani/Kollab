// require mongoose
const mongoose = require('mongoose');
// bcypt is used to hash the password
const bcrypt = require('bcrypt');

// to remove deprecation warning which we get from using the unique key in the schema we use following line.
// the warning is a known issue with mongoose. Read more here -->  https://github.com/Automattic/mongoose/issues/6890
mongoose.set('useCreateIndex', true);

// create a schema for user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true,"Please provide a username"],
        min: 6,
        max: 15
    },
    email: {
        type: String,
        required: [true,"Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true });

// the following code will execute right before we save
userSchema.pre('save',function(next){
    // no need to hash password if already modified
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

userSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null,isMatch);
            return cb(null,this);
        }
    })
}

// create model with the schema
const User = mongoose.model('User', userSchema);

// export model
module.exports = User;