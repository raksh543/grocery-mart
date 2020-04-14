module.exports=function Cart(oldCart){
    this.items=oldCart.items || {};
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;

    this.add = function(item, id){
        //if item already exist, group it
        var storedItem=this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item:item, qty:0, price:0};
        }
        storedItem.qty++;
        storedItem.price= storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    this.reduceByOne = function(id){
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price
        this.totalQty--;
        this.totalPrice-=this.items[id].item.price

        if(this.items[id].qty <= 0){
            delete this.items[id];
        }
    }

    this.removeItem=function(id){
        this.totalPrice -= this.items[id].price
        this.totalQty -= this.items[id].qty
        delete this.items[id];
    }

    this.generateArray = function(){
        var arr =[];
        for (var id in this.items){
            arr.push(this.items[id])
        }
        return arr;
    }
};

// //items in cart
// const mongoose=require('mongoose')
// const validator=require('validator')

// var CartSchema=new mongoose.Schema({
//     productName:{
//         type: String,
//         trim: true,
//         required:true
//     },
//     price:{
//         type:Number,
//         trim:true,
//         required:true
//     },
//     quantity:{
//         type:Number,
//         required:true
//     }
//     // email:{
//     //     type: String,
//     //     unique: true,
//     //     required: true,
//     //     trim: true,
//     //     lowercase: true,
//     //     validate(value) {
//     //         if (!validator.isEmail(value)) {
//     //             throw new Error('Email is invalid')
//     //         }
//     //     }
//     // },
    


// });

// module.exports=CartSchema