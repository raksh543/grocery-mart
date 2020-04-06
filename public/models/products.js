const mongoose=require('mongoose')

var ProductsSchema=new mongoose.Schema({
    productName:{
        type: String,
        trim: true,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    }


});

module.exports=UserCartSchema