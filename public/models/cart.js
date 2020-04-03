//items in cart
const mongoose=require('mongoose')
const validator=require('validator')

var CartSchema=new mongoose.Schema({
    productName:{
        type: String,
        trim: true,
        required:true
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
    // email:{
    //     type: String,
    //     unique: true,
    //     required: true,
    //     trim: true,
    //     lowercase: true,
    //     validate(value) {
    //         if (!validator.isEmail(value)) {
    //             throw new Error('Email is invalid')
    //         }
    //     }
    // },
    


});

module.exports=CartSchema