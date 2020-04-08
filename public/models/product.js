const mongoose=require('mongoose')
var Schema=mongoose.Schema;

var ProductsSchema=new Schema({
    imagePath:{
        type:String,
        required:true
    },
    title:{
        type: String,
        trim: true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    }


});
module.exports=ProductsSchema
// module.exports=mongoose.model('Product', ProductsSchema)