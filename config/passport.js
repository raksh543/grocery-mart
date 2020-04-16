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
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Invalid password').notEmpty().isLength({min:7});
    // var errors = req.validateErrors();
    // if(errors){
    //     var messages = [];
    //     errors.forEach(function(error){
    //         messages.push(error.msg);
    //     })
    //     return done(null, false, req.flash('error',messages))
    // }
    Member.findOne({'email':req.body.email}, function(err, user){
        if(err){
            return done(err)
        }
        if(user){
            return done(null, false, {message:'Email is already in use.'})
        }
        var newUser=new Member(); 
        newUser.name=req.body.name;
        newUser.email=req.body.email;
        newUser.password=newUser.encryptPassword(req.body.password);
        if(req.body.password==req.body.passwordTwo){
            newUser.save(function(err, result){
                console.log(newUser)
                if(err){
                    return done(err)
                }
                return done(null, newUser)
                
            })
        }else{
            return done(null, false, {message:'Passwords do not match.'})
        }
        
        
    })
}))
// passport.use('local.signup', new LocalStrategy({
//     usernameField:'email',
//     passwordField:'password',
//     passReqToCallback:true
// },function(req, email, password, done){
//     req.checkBody('email','Invalid email').notEmpty().isEmail();
//     req.checkBody('password','Invalid password').notEmpty().isLength({min:7});
//     // var errors = req.validateErrors();
//     // if(errors){
//     //     var messages = [];
//     //     errors.forEach(function(error){
//     //         messages.push(error.msg);
//     //     })
//     //     return done(null, false, req.flash('error',messages))
//     // }
//     Member.findOne({'email':req.body.email}, function(err, user){
//         if(err){
//             return done(err)
//         }
//         if(user){
//             return done(null, false, {message:'Email is already in use.'})
//         }
//         var newUser=new Member(); 
//         newUser.email=req.body.email;
//         newUser.password=newUser.encryptPassword(req.body.password);
//         newUser.save(function(err, result){
//             if(err){
//                 return done(err)
//             }
//             return done(null, newUser)
//         })
        
//     })
// }))

passport.use('local.signin', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true

},function(req,res, password, done){
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Invalid password').notEmpty();
    // var errors = req.getValidationResult()
    // if(errors){
    //     var messages = [];
    //     errors.forEach(function(error){
    //         messages.push(error.msg);    
    //     })
    //     return done(null, false, req.flash('error',messages))
    // }

    Member.findOne({'email':req.body.email}, function(err, user){
        if(err){
            return done(err)
        }
        if(!user){
            return done(null, false, {message:'No user found.'})
        }
        if(!user.validPassword(password)){
            return done(null, false, {message:'Wrong password.'})
        }
        return done(null, user)
        
    })
}))
