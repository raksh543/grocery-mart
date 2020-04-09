var passport=require('passport');
var mongoose=require('mongoose')
var UserSchema=require('../public/models/userschema')
var LocalStrategy=require('passport-local').Strategy;


var Member=mongoose.model("Member",UserSchema);
passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(function(id, done){
    Member.findById(id, function(err, user){
        done(err,user)
    })
})
passport.use('local.signup', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function(req, email, password, done){
    Member.findOne({'email':req.body.email}, function(err, user){
        if(err){
            return done(err)
        }
        if(user){
            return done(null, false, {message:'Email is already in use.'})
        }
        var newUser=new Member(); 
        newUser.email=req.body.email;
        newUser.password=newUser.encryptPassword(req.body.password);
        newUser.save(function(err, result){
            if(err){
                return done(err)
            }
            return done(null, newUser)
        })
        
    })
}))