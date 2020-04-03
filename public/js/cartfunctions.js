const CartSchema=require('../models/cart')
const mongoose=require('mongoose')

function addProduct(product,price){
    var Cart=mongoose.model("Cart",CartSchema)
    var newCart=new Cart({
        productName:product,
        price:price,
        quantity:1

    })
}