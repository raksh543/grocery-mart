// var express = require('express');
// var router=express.Router();
// var Product=require('../models/product')
// // var csrf=require('csurf')

// // var csrfProtection=csrf();
// // router.use(csrfProtection)

// router.get('/beverages',function(req,res,next){
//    Product.find(function(err,docs){
//        var productChunks =[];
//        var chunkSize=3;
//        for ( var i=0; i<docs.length; i+= chunkSize){
//            productChunks.push(docs.slice(i, i+chunkSize));
//        }
//     res.render('beverages',{title:'Beverages', products: productChunks});
  
//    });
// });

// // router.get('/signup',(req,res,next)=>{

// //     res.render('signup',{
// //        csrfToken: req.csrfToken
// //     })
// // })

// module.exports = router;