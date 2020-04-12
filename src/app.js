const express=require('express')
const hbs=require('hbs')
const bcrypt = require('bcryptjs')
const path=require('path')
var mongoose = require('mongoose');
var validator=require('express-validator')
var csrf=require('csurf')
var cookieParser = require('cookie-parser')
var session=require('express-session')
var passport=require('passport')
var flash=require('connect-flash')
var MongoStore=require('connect-mongo')(session)

var Cart=require('../public/models/cart')
const UserSchema=require('../public/models/userschema')
var ProductsSchema=require('../public/models/product')
//const MongoClient = require('mongodb').MongoClient;
// var router=require('../public/routes/index')

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
app.use(validator())
app.use(cookieParser())
app.use(session(
    { 
        secret:'mysupersecret',
        resave:false,
        saveUninitialized:false,
        store: new MongoStore({ mongooseConnection:mongoose.connection}),
        cookie:{maxAge: 60 * 60 * 1000}
        }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//this is middleware
app.use((req,res,next)=>{
    res.locals.login=req.isAuthenticated();
    res.locals.session=req.session;
    next();
})
// app.use(router)

mongoose.connect("mongodb+srv://monchu:monchu@cluster0-dgfgi.mongodb.net/Grocery?retryWrites=true&w=majority");//creating or joining to practice database


flag=false;

var Member=mongoose.model("Member",UserSchema);
// var pruduct=mongoose.model("Product",UserSchema);
// var usercart=mongoose.model("UserCart",UserSchema);

//---------------------------------in config/passport.js------
require('../config/passport')

//-------------------------------------



app.get('/',(req,res)=>{
    res.render('index',{
        title:'Grocery Mart',
        name:'Rakshita'
    })
})

var Product=mongoose.model("Product",ProductsSchema)
app.get('/beverages',function(req,res,next){
    Product.find(function(err,docs){
        var productChunks =[];
        var chunkSize=3;
        for ( var i=0; i<docs.length; i+= chunkSize){
            productChunks.push(docs.slice(i, i+chunkSize));
        }
     res.render('beverages',{title:'Beverages', products: productChunks});
   
    });
 });

 var csrfProtection=csrf();
app.use(csrfProtection)

app.get('/profile',isLoggedIn,(req,res, next)=>{
    res.render('profile',{
        title:'Products',
        name:'Rakshita'
    })
})

app.get('/logout',isLoggedIn, (req,res,next)=>{
    req.logout();
    res.redirect('/')
})

// app.use('/',notLoggedIn,function(req,res,next){
//     next();
// })


app.get('/signup',(req,res, next)=>{
    var messages=req.flash('error');
    res.render('signup',{
        csrfToken:req.csrfToken(),
        messages: messages,
        hasErrors:messages.length>0
    })
}) 

app.post('/doSignup',passport.authenticate('local.signup',{
    successRedirect:'/profile',
    failureRedirect:'/signup',
    failureFlash:true
}))

app.get('/signin',(req,res, next)=>{
    var messages=req.flash('error');
    res.render('signin',{
        csrfToken:req.csrfToken(),
        messages: messages,
        hasErrors:messages.length>0
    })
})

app.post('/doSignIn',passport.authenticate('local.signin',{
    successRedirect:'/profile',
    failureRedirect:'/signin',
    failureFlash:true
}))

app.get('/products',(req,res)=>{
    res.render('products',{
        title:'Products',
        name:'Rakshita'
    })
})
app.get('/testing',(req,res)=>{
    res.render('testing',{
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


app.get('/cart/:id',(req,res,next)=>{
    var productId=req.params.id;
    var cart = new Cart((req.session.cart ? req.session.cart : {})) 

    Product.findById(productId, function(err, product){
        if(err){
            return res.redirect('/beverages')
        }
        cart.add(product, product.id)
        req.session.cart = cart
        console.log(req.session.cart)
        res.redirect('/beverages')
    })
})

app.get('/shopping-cart',(req, res, next)=>{
    if(!req.session.cart){
        return res.render('shopping-cart', {products:null})
    }
    var cart=new Cart(req.session.cart)
    res.render('shopping-cart', {products: cart.generateArray(), totalPrice:cart.totalPrice})
})

app.get('/checkout', (req, res, next)=>{
    if(!req.session.cart){
        return res.redirect('/shopping-cart')
    }
    var cart=new Cart(req.session.cart)
    res.render('checkout', {total: cart.totalPrice})
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

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');

}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');

}

module.exports=flag