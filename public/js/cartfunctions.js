const CartSchema=require('../models/cart')
const mongoose=require('mongoose')
const person=require('./app.js')
const User=require('../models/userschema')

function addProduct(product,price){
    var Cart=mongoose.model("Cart",CartSchema)
    var newCart=new Cart({
            productName:product,
            price:price,
            
            if(person){
                const user=await person.findByIdAndUpdate(id, {
                    productName:product,
                    price:price,
                })
            }

    })
}