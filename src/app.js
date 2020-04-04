const express=require('express')
const hbs=require('hbs')
const bcrypt = require('bcryptjs')
const path=require('path')
const validator=require('validator')
var mongoose = require('mongoose');
const UserSchema=require('../public/models/userschema')
const MongoClient = require('mongodb').MongoClient;

const app=express()
const port=process.env.PORT || 3030

const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

mongoose.connect("mongodb+srv://monchu:monchu@cluster0-dgfgi.mongodb.net/Grocery?retryWrites=true&w=majority");//creating or joining to practice database


flag=false;
//creating registration schema
// var UserSchema=new mongoose.Schema({
//     name:{
//         type: String,
//         trim: true,
//         required:true
//     },
//     email:{
//         type: String,
//         unique: true,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password:{
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Password cannot contain "password"')
//             }
//         }
//     },
//     passwordTwo:{
//         type: String,
//         trim: true
//     }


// });
var Member=mongoose.model("Member",UserSchema);

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
        res.render('signup',{msg1:"User already exist!"});
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
                            res.render('index',{success:"successfully registereds"});
                            flag=person;
                        }
                    })
                })
            })
        }
    });
})

app.get('/signup',(req,res)=>{
    msg1=null
    // const name=req.body.name
    // const email=req.body.email
    // const pass1=req.body.password
    // const pass2=req.body.password2
    // const submit=req.body.submit
    //console.log(req.query.name)
    res.render('signup',{
       
    })
   // console.log(name)
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