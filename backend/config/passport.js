// passport will be authentication middleware
const passport = require('passport');
// we will authenticate against local strategy
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('../models/user');

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

// for authorization
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "MojoMojoMojo"
},(payload,done)=>{
    User.findById({_id:payload.sub},(err,user)=>{
        if(err)
            return done(err,false);
        if(user)
            return done(null,user);
        else
            return done(null,false);
    })
}));

// authenticate using email and password
passport.use(new LocalStrategy({
    // change passport's default authentication fields to email and password
    usernameField: 'email',
    passwordField: 'password'
    },(email,password,done)=>{
        User.findOne({email},(err,user)=>{
            // something went wrong
            if(err)
                return done(err);

            // if no user exists
            if(!user)
                return done(null,false);

            // check if password is correct
            user.comparePassword(password,done);
        })
}));

