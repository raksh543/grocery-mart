var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

const UserSchema = require('../models/userschema')
const ProductsSchema = require('../models/product')

var Member = mongoose.model("Member", UserSchema);
var Product = mongoose.model("Product", ProductsSchema);

router.get('/doSignupRes', (req, res, next) => {
    res.render('signup.res.hbs')
})

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
        res.send({ _id: 1, msg: 'Successfully logged in!' })  
    })
}
    
)

router.get('/cartRes', (req, res, next) => {
    var productId = req.body.title;
    // var cart = new Cart((req.session.cart ? req.session.cart : {}))

    Product.findOne({'title' : productId}, function (err, product) {
        if (err) {
            return res.send({ _id: -1, msg: 'Product not found' })
        }
        // cart.add(product, product.id)
        // req.session.cart = cart
        // console.log(req.session.cart)
        if(product){
            res.send({_id:1})
        }
    })
})

module.exports = router