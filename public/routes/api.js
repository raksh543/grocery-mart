var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const querystring = require('querystring');

const UserSchema = require('../models/userschema')
const ProductsSchema = require('../models/product')
const CategorySchema = require('../models/categories')
const OrderSchema = require('../models/orders')

var Member = mongoose.model("Member", UserSchema);
var Product = mongoose.model("Product", ProductsSchema);
var Category = mongoose.model("Category", CategorySchema);
var Order = mongoose.model("Order", OrderSchema);
var Cart = require('../models/cart')

// router.get('/doSignupRes', (req, res, next) => {
//     res.render('signup.res.hbs')
// })

const handleError = res => res.send({ msg: 'Registration Failed!' });

router.post('/doSignupRes', (req, res) => {

    Member.findOne({ 'email': req.body.email }, function (err, user) {
        if (err) {
            handleError(res);
        }if (user) {
            res.send({ _id: -1, msg: 'Username already exists!' });
        } else {      
            var newUser = new Member();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = newUser.encryptPassword(req.body.password);
            if (req.body.password == req.body.passwordTwo) {
                newUser.save(function (err, result) {
                    if (err) res.send({ _id: -2, msg: 'Some problem occured in sign up! Please try again.' });
                    else {
                        // res.setHeader('Content-Type', 'application/json');
                        res.send(newUser);}
                })
            }
            }
        })
})

router.post('/doSigninRes', function (req, res, next) {
    Member.findOne({'email':req.body.email}, function(err, user){
        if(err){
            return res.send(err)
        }
        if(!user){
            return res.send({ _id: -1, msg: 'No user found!' });
        }
        if(!user.validPassword(req.body.password)){
            return res.send({ _id: -2, msg: 'Wrong Password!' });
        }
        res.send({ msg: 'Successfully logged in!', _id: user.id,name:user.name })  
    })
}
    
)


router.get('/searchRes', (req, res) => {
    var productId = req.query.searchText
    console.log(req)
    Product.find({ 'title': {$regex: productId, $options: "$i"} }, function (err, products) {
        if (err) {
            return handleError(res);
        } if (!products) {
            return res.send({ _id: -1, msg: 'No product found!' });
        } else {
            res.send(products);
        }
    })
})

router.get('/getCategories',(req,res)=>{
    Category.find((err,categories)=>{
        if(err){
            return handleError(res)
        }if(!categories){
            return res.send({_id: -1, msg: 'No categories found!'})
        }else{
            res.send(categories)
        }
    })
})

router.get('/searchByCategory',(req,res)=>{
    var searchCategory=req.query.searchText
    Product.find({'category':{$regex: searchCategory, $options: "$i"}},(err,products)=>{
        if(err){
            return handleError(res)
        }
        if(!products){
            return res.send({_id: -1, msg:"No products found!"})
        }else{
            res.send(products)
        }
    })
})

router.get('/profileRes', (req, res) => {
    Member.findOne({'email':req.query.user}, (err, user)=>{
        // Member.findOne({'email':"Rakshitajain777@gmail.com"}, (err, user)=>{
        var userid = user._id
        console.log(userid)
        Order.find({
            user: userid
        }, (err, orders) => {
            if (err) {
                return res.write('Error!');
            }
            var cart;
            orders.forEach(function (order) {
                cart = new Cart(order.cart)
                order.items = cart.generateArray()
            })
            res.send(orders)
    
        })
    })

})

router.post('/saveOrder',(req,res)=>{
    
    var order = req.body.orderObject
    // console.log("Before parsing-----------"+order)
    // var stringOrder = JSON.parse(JSON.stringify(order))
    var orderr = new Order (JSON.parse(order))
    // console.log("After parsing--------"+orderr)
    // console.log(order._id)
    orderr.save((err,result)=>{
        if(err){
            res.send({error:err, _id: -1, msg: 'Some problem occured in saving order! Please try again.'+ err })
        }else{
            res.send({ _id: 1, msg: 'Order saved successfully.' })
        }
    })

// console.log(order)
})

module.exports = router