const express = require('express')
const bodyParser = require('body-parser')
var webpush = require('web-push')
const hbs = require('hbs')
const bcrypt = require('bcryptjs')
const path = require('path')
var mongoose = require('mongoose');
var validator = require('express-validator')
var csrf = require('csurf')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var nodemailer = require('nodemailer')
var flash = require('connect-flash')
var Razorpay = require('razorpay')

var MongoStore = require('connect-mongo')(session)


var Cart = require('../public/models/cart')
const UserSchema = require('../public/models/userschema')
var ProductsSchema = require('../public/models/product')
var OrderSchema = require('../public/models/orders')
const adminRouter = require('../public/routes/admin-router')
var apiRoute = require('../public/routes/api')
//const MongoClient = require('mongodb').MongoClient;
// var router=require('../public/routes/index')

mongoose.connect("mongodb+srv://monchu:monchu@cluster0-dgfgi.mongodb.net/Grocery?retryWrites=true&w=majority", { useNewUrlParser: true });//creating or joining to practice database


const app = express()

const publicVapidKey = 'BIe6mxOIVZTA9OBKXgfZzdJe_dqhqrMEU7QbPVdwHDLvdEL1hJ0Z8Qjt0x8EByWSAkGOYOKqbKc2dDJvTSF6vF0'
const privateVapidKey = 'QFiiWKJPk2RSR3JauuJSFAd9jkQXTkZPWK-JPqk0FSo'

const port = process.env.PORT || 3030

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use('/admin', adminRouter)
app.use(express.static(path.join(__dirname, 'client_notifications')));
app.use(express.static(publicDirectoryPath))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(validator())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session(
    {
        secret: 'coz-i-cab-not-decide-a-super-long-password',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: { maxAge: 60 * 60 * 1000 }
    }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(apiRoute)

webpush.setVapidDetails('mailto: rakshitajain777@gmail.com', publicVapidKey, privateVapidKey)

//this is middleware
app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
})
// app.use(router)

flag = false;

var Member = mongoose.model("Member", UserSchema);
var Product = mongoose.model("Product", ProductsSchema);
var Order = mongoose.model("Order", OrderSchema)
// var pruduct=mongoose.model("Product",UserSchema);
// var usercart=mongoose.model("UserCart",UserSchema);
var instance = new Razorpay({
    key_id: 'rzp_test_gxXdHsXsGPtTvp',
    key_secret: '8Jc8j68xWN9KtL5nlMuvZdAr'
})
// API signature
// {razorpayInstance}.{resourceName}.{methodName}(resourceId [, params])

// example



//---------------------------------in config/passport.js------
require('../config/passport')

//-------------------------------------

//------------------------for admin page--------------------------

app.get('/payment', (req, res) => {
    res.render('payment')
})

app.post('/payment', (req, res) => {
    // console.log(req)
    razorpay_payment_id = req.body.razorpay_payment_id
    razorpay_order_id = req.body.razorpay_order_id
    razorpay_signature = req.body.razorpay_signature
        if (!req.session.cart) {
            return res.redirect('/shopping-cart')
        }
        var cart = new Cart(req.session.cart)

        var order = new Order({
            user: req.user,
            name:"req.body.name",
            address:"req.body.address",
            paymentId: req.body.razorpay_payment_id,
            cart: cart
        });
        order.save((err, result) => {
            if (err) {
                req.flash('error', 'Payment failed');
            } else {
                req.flash('success', 'Successfully bought product!');
                req.session.cart = null;
                res.redirect('/profile');
            }
        })
    

})
app.post('/success', (req, res) => {
    console.log(req.body.amount +"Pottiiee")
    var options = {
        amount: req.body.amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: true
    };

    instance.orders.create(options, function (err, order) {
        console.log((order))
        if (err) {
            res.send(err)
        } if (order) {
            // console.log('(((((((((((((((((((((((((((((((((((((((((((((((' + order.id)
            res.render('payment', { order_id: order.id, })
        }
    })
})

app.post('/subscribe', (req, res) => {
    //get pushSubscription object
    const subscription = req.body

    //send 201 - resource created
    res.status(201).json({})
    // res.writeHead(201, {
    //     'Content-Type': 'application/javascript'
    // });

    //create payload
    const payload = JSON.stringify({ title: 'Push Test' })

    //Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err))
})

app.get('/', (req, res, next) => {
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('index', { title: 'Beverages', products: productChunks });

    });
})


app.get('/notification', (req, res) => {
    res.render('notification')
})

app.get('/testing', (req, res, next) => {
    Product.find(function (err, docs) {
        var productChunks = [];

        for (var i = 0; i < docs.length; i++) {
            productChunks.push(docs);
        }
        res.render('testing', { title: 'Beverages', products: productChunks });

    });
})

app.get('/categories', (req, res, next) => {
    res.render('categories')
})

app.get('/beverages', function (req, res, next) {
    Product.find(function (err, docs) {
        var productChunks = [];

        for (var i = 0; i < docs.length; i++) {
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

app.post('/search', (req, res, next) => {
    var productId = req.body.searchText
    Product.find({ 'title': { $regex: productId, $options: "$i" } }, function (err, products) {
        if (err) {
            return handleError(res);
        } if (!products) {
            return res.send({ _id: -1, msg: 'No product found!' });
        } else {
            // res.send(product)
            // res.render('beverages',{product:product})   
            // res.render('searchResult',{product})

            var productChunks = [];

            for (var i = 0; i < products.length; i++) {
                productChunks.push(products);
            }
            res.render('beverages', { title: 'Beverages', products: productChunks });
        }
    })
})

var csrfProtection = csrf();
app.use(csrfProtection)

app.get('/profile', isLoggedIn, (req, res, next) => {
    Order.find({
        user: req.user
    }, (err, orders) => {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart)
            order.items = cart.generateArray()
        })
        res.render('profile', { orders: orders })

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


app.post('/doSignup', passport.authenticate('local.signup', {
    failureRedirect: '/signup',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {

        const email = req.body.email
        const output = `
        <h3> Hello ${req.body.name}</h3>
        <p>You have successfully logged in.</p>
        <p> Jump in right now and explore the products and get amazing offers.</p>`;


        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'justfordemo999@gmail.com', // generated ethereal user
                pass: 'justfordemo999@work' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let mailOptions = {
            from: '"Grocery Mart 👻😀" <justfordemo999@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔🤗", // Subject line
            text: "Hello world?", // plain text body
            html: output // html body
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            }
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        })



        res.redirect('/profile');
        // console.log(passport)
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

app.get('/reduce/:id', (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart((req.session.cart ? req.session.cart : {}))

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart')
})

app.get('/add/:id', (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart((req.session.cart ? req.session.cart : {}))

    cart.addByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart')
})

app.get('/remove/:id', (req, res, next) => {
    var productId = req.params.id;
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
    res.render('checkout', { total: cart.totalPrice, csrfToken: req.csrfToken(), errMsg: errMsg, noError: !errMsg })
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
                if (err) {
                    req.flash('error', 'Payment failed');
                } else {
                    req.flash('success', 'Successfully bought product!');
                    req.session.cart = null;
                    res.redirect('/profile');
                }
            })
        })
})

app.get('/services', (req, res) => {
    res.render('services', {
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