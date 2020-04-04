const CartSchema=require('../models/cart')
const mongoose=require('mongoose')
const flag=require('./app.js')

function addProduct(product,price){
    var Cart=mongoose.model("Cart",CartSchema)
    var newCart=new Cart({
            productName:product,
            price:price,
            

    })
}