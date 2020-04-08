const express=require('express')
const hbs=require('hbs')
const bcrypt = require('bcryptjs')
const path=require('path')
const validator=require('validator')
var mongoose = require('mongoose');
var session=require('express-session')
var csrf = require('csurf')
//  var passport=require('passport')
//  var flash=require('connect-flash')
// const UserSchema=require('../public/models/userschema')
var Member=require('../public/models/userschema')
//const MongoClient = require('mongodb').MongoClient;
// const router=express.Router()
var router=require('../public/routes/index')

const app=express()
const port=process.env.PORT || 3030

const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)





app.use(router)
app.use(express.static(publicDirectoryPath))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({secret: 'mysupersecret', resave:false, saveUninitialized:false}))
// app.use(flash)
// app.use(passport.initialize())
// app.use(passport.session())


var csrfProtection=csrf();
app.use(csrfProtection)

mongoose.connect("mongodb+srv://monchu:monchu@cluster0-dgfgi.mongodb.net/Grocery?retryWrites=true&w=majority");//creating or joining to practice database

flag=false;
// var Member=mongoose.model("Member",UserSchema);
// var pruduct=mongoose.model("Product",UserSchema);
// var usercart=mongoose.model("UserCart",UserSchema);

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Grocery Mart',
        name:'Rakshita'
    })
})

app.post('/doSignup',(req,res)=>{
    msg1=null
    //var name=req.body.name;
    var email=req.body.email2;
    var password=req.body.password;
    var passwordTwo=req.body.passwordTwo;
    if(passwordTwo!=password){
        res.render('signup',{msg1:"Passwords do not match"});
    }
   
    
//    //validation of registration form
//     req.checkBody('name','Name is required').notEmpty();
//     req.checkBody('email','E-mail is required').notEmpty();
//     req.checkBody('email',' Valid E-mail is required').isEmail();
//     req.checkBody('password','Password is required').notEmpty();
//     req.checkBody('password2', 'Passwords do not match').equals(password);

//     var errors=req.validationErrors();
//     if(errors){
        

//         res.render('index',{errors:errors});
        
//     }
    var username= req.body.name2;
    Member.findOne({'name':username},function(err,person)
    {
        if(person)
        res.render('signup',{msg1:"User already exist login to your account!"});
        else{
            var  newmember=new Member({
                name:username,
                email:email,
                password:password    
            });
            
    
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newmember.password,salt,function(err,hash){
                    if(err){
                        console.log(err);
                    }
                    newmember.password=hash;
                    newmember.save(function(err){
                        if(err){
                            console.log(err);
                            return;
                        }
                        else{
                            res.redirect('signin');
                            // res.redirect('signin',{success:"successfully registereds"});
                            flag=person;
                        }
                    })
                })
            })
        }
    });
})

app.get('/signup',(req,res)=>{
    res.render('signup',{
        csrfToken: req.csrfToken()
    })
})

app.post('/doSignIn',(req,res)=>{
    var email=req.body.email
    var query={email:email };
 Member.findOne(query,function(err,person){
     console.log(query)
        if(err)res.status(404);
            if(!person){
                
                res.render('signin',{message:'Wrong email-id'});
             }
             else{
               
                bcrypt.compare(req.body.password,person.password,function(err,isMatch){
                    if(err){

                        console.log(err);
                    }
                    if(isMatch){
                        flag=person;
                        //res.sendFile(__dirname+"/faultform.html");
                        res.redirect('/');
                    }else{
                        //console.log(req.body.password);
                         //var msg="Wrong password";
                        res.render('signin',{message:'wrong password'});                     
                    }
                });
             }
    });

})

app.get('/signin',(req,res)=>{

    res.render('signin',{
        title:'Products',
        name:'Rakshita'
    })
})



app.get('/products',(req,res)=>{
    res.render('products',{
        title:'Products',
        name:'Rakshita'
    })
})
app.get('/homepage',(req,res)=>{
    res.render('homepage',{
        title:'Products',
        name:'Rakshita'
    })
})

app.post('/addtocart',(req,res)=>{
    var coffee=req.body.p1
    var tea=req.body.p2
    var orange=req.body.p3
    var strawberry=req.body.p4
    var total=(25*parseInt(coffee))+(20*parseInt(tea))+(50*parseInt(orange))+(50*parseInt(strawberry))
    console.log(coffee)
    res.render('cart',{
        coffee:coffee,
        tea:tea,
        orange:orange,
        strawberry:strawberry,
        total:total
    })

})


app.get('/cart',(req,res)=>{
   

    res.render('cart',{
        title:'Products',
        name:'Rakshita',
    })
})

app.get('/online_services',(req,res)=>{
    res.render('404',{
        title:'Products',
        name:'Rakshita'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Rakshita Jain',
        errorMessage:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on the port'+port)
})

module.exports=flag