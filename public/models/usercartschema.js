const mongoose=require('mongoose')

var UserCartSchema=new mongoose.Schema({
    productName:{
        type: String,
        trim: true,
        required:true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
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