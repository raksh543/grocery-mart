const express = require('express')
const hbs = require('hbs')
const bcrypt = require('bcryptjs')
const path = require('path')
var mongoose = require('mongoose');
var validator = require('express-validator')
var csrf = require('csurf')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var flash = require('connect-flash')
var MongoStore = require('connect-mongo')(session)


var Cart = require('../public/models/cart')
const UserSchema = require('../public/models/userschema')
var ProductsSchema = require('../public/models/product')
var OrderSchema = require('../public/models/orders')
//const MongoClient = require('mongodb').MongoClient;
// var router=require('../public/routes/index')

const app = express()
const port = process.env.PORT || 3030

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(validator())
app.use(cookieParser())
app.use(session(
    {
        secret: 'mysupersecret',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: { maxAge: 60 * 60 * 1000 }
    }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//this is middleware
app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
})
// app.use(router)

mongoose.connect("mongodb+srv://monchu:monchu@cluster0-dgfgi.mongodb.net/Grocery?retryWrites=true&w=majority");//creating or joining to practice database


flag = false;

var Member = mongoose.model("Member", UserSchema);
var Product = mongoose.model("Product", ProductsSchema);
var Order=mongoose.model("Order",OrderSchema)
// var pruduct=mongoose.model("Product",UserSchema);
// var usercart=mongoose.model("UserCart",UserSchema);

//---------------------------------in config/passport.js------
require('../config/passport')

//-------------------------------------



app.get('/', (req, res,next) => {
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('index', { title: 'Beverages', products: productChunks });

    });
})

app.get('/testing', (req, res,next) => {
    Product.find(function (err, docs) {
        var productChunks = [];
        
        for (var i = 0; i < docs.length; i ++) {
            productChunks.push(docs);
        }
        res.render('testing', { title: 'Beverages', products: productChunks });

    });
})


app.get('/beverages', function (req, res, next) {
    Product.find(function (err, docs) {
        var productChunks = [];
        
        for (var i = 0; i < docs.length; i ++) {
            productChunks.push(docs);
        }
        // var productChunks = [];
        // var chunkSize = 3;
        // for (var i = 0; i < docs.length; i += chunkSize) {
        //     productChunks.push(docs.slice(i, i + chunkSize));
        // }
        res.render('beverages', { title: 'Beverages', products: productChunks });

    });
});

var csrfProtection = csrf();
app.use(csrfProtection)

app.get('/profile', isLoggedIn, (req, res, next) => {
    Order.find({
        user: req.user
    },(err, orders)=>{
        if(err){
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart)
            order.items = cart.generateArray()
        })
        res.render('profile',{ orders:orders})

    })
})

app.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect('/')
})

// app.use('/',notLoggedIn,function(req,res,next){
//     next();
// })


app.get('/signup', (req, res, next) => {
    var messages = req.flash('error');
    res.render('signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    })
})

// app.post('/doSignup', function(req,res,next){
//     passport.use('local.signup', new LocalStrategy({
//         usernameField:'email',
//         passwordField:'password',
//         passReqToCallback:true
//     },function(err,user, done){
        
//         req.checkBody('email','Invalid email').notEmpty().isEmail();
//         req.checkBody('password','Invalid password').notEmpty().isLength({min:7});
//         // var errors = req.validateErrors();
//         // if(errors){
//         //     var messages = [];
//         //     errors.forEach(function(error){
//         //         messages.push(error.msg);
//         //     })
//         //     return done(null, false, req.flash('error',messages))
//         // }
//         Member.findOne({'email':req.body.email}, function(err, user){
//             if(err){
//                 return done(err)
//             }
//             if(user){
//                 return done(null, false, {message:'Email is already in use.'})
//             }
//             var newUser=new Member(); 
//             newUser.name=req.body.name;
//             newUser.email=req.body.email;
//             newUser.password=newUser.encryptPassword(req.body.password);
//             if(req.body.password==req.body.passwordTwo){
//                 newUser.save(function(err, result){
//                     console.log(newUser)
//                     if(err){
//                         return done(err)
//                     }
//                     if (req.session.oldUrl) {
//                         var oldUrl = req.session.oldUrl;
//                         req.session.oldUrl = null;
//                         res.sendFile(newUser)
//                         res.redirect(oldUrl);
//                     } else {
//                         // console.log(newUser)
//                         // res.send(newUser)
//                         // console.log(passport)
//                         res.sendFile(newUser)
//                         res.redirect('/profile')
//                     }
//                     return done(null, newUser)
                    
//                 })
//             }else{
//                 return done(null, false, {message:'Passwords do not match.'})
//             }
            
            
//         })
//     }))
// }, function (req, err, next) {
//     if (req.session.oldUrl) {
//         var oldUrl = req.session.oldUrl;
//         req.session.oldUrl = null;
//         res.sendFile(newUser)
//         res.redirect(oldUrl);
//     } else {
//         // console.log(newUser)
//         // res.send(newUser)
//         // console.log(passport)
//         res.sendFile(newUser)
//         res.redirect('/profile')
//     }
// })

app.post('/doSignup', passport.authenticate('local.signup', {
    failureRedirect: '/signup',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        // console.log(newUser)
        // res.send(newUser)
        // console.log(passport)
        res.redirect('/profile')
    }
})

app.get('/signin', (req, res, next) => {
    var messages = req.flash('error');
    res.render('signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    })
})

app.post('/doSignIn', passport.authenticate('local.signin', {
    failureRedirect: '/signin',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/profile')
    }
})

app.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products',
        name: 'Rakshita'
    })
})


// app.post('/addtocart', (req, res) => {
//     var coffee = req.body.p1
//     var tea = req.body.p2
//     var orange = req.body.p3
//     var strawberry = req.body.p4
//     var total = (25 * parseInt(coffee)) + (20 * parseInt(tea)) + (50 * parseInt(orange)) + (50 * parseInt(strawberry))
//     console.log(coffee)
//     res.render('cart', {
//         coffee: coffee,
//         tea: tea,
//         orange: orange,
//         strawberry: strawberry,
//         total: total
//     })

// })


app.get('/cart/:id', (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart((req.session.cart ? req.session.cart : {}))

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/beverages')
        }
        cart.add(product, product.id)
        req.session.cart = cart
        console.log(req.session.cart)
        res.redirect(req.get('referer'))
    })
})

app.get('/reduce/:id',(req,res,next)=>{
    var productId= req.params.id;
    var cart = new Cart((req.session.cart ? req.session.cart : {}))

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart')
})

app.get('/add/:id',(req,res,next)=>{
    var productId= req.params.id;
    var cart = new Cart((req.session.cart ? req.session.cart : {}))

    cart.addByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart')
})

app.get('/remove/:id',(req,res,next)=>{
    var productId= req.params.id;
    var cart = new Cart((req.session.cart ? req.session.cart : {}))

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart')
})

app.get('/shopping-cart', (req, res, next) => {
    if (!req.session.cart) {
        return res.render('shopping-cart', { products: null })
    }
    var cart = new Cart(req.session.cart)
    res.render('shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice })
})

app.get('/checkout', isUserLoggedIn, (req, res, next) => {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart')
    }
    var cart = new Cart(req.session.cart)
    var errMsg = req.flash('error')[0];
    res.render('checkout', { total: cart.totalPrice, csrfToken:req.csrfToken(), errMsg: errMsg, noError: !errMsg })
})

app.post('/checkout', isUserLoggedIn, (req, res, next) => {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart')
    }
    var cart = new Cart(req.session.cart)

    var stripe = require('stripe')('sk_test_ibdmQudewKOFQONKNrhpqcJQ00QKbE1M9a');

    // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
    stripe.charges.create(
        {
            amount: cart.totalPrice,
            currency: 'inr',
            source: req.body.stripeToken,
            description: 'Test charge'
        },
        function (err, charge) {
            // asynchronously called
            if (err) {
                req.flash('error', 'Wrong card details');
                return res.redirect('/checkout')
            }
            var order = new Order({
                user: req.user,
                cart: cart,
                address: req.body.address,
                name: req.body.name,
                paymentId: charge.id
            });
            order.save((err, result) => {
                if(err){
                    req.flash('error', 'Payment failed');
                }else{
                req.flash('success', 'Successfully bought product!');
                req.session.cart = null;
                res.redirect('/');
            }
            })
        })
})

app.get('/online_services', (req, res) => {
    res.render('404', {
        title: 'Products',
        name: 'Rakshita'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rakshita Jain',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on the port' + port)
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');

}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');

}

function isUserLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/signin');

}

module.exports = flag