const mongoose=require('mongoose')
var Schema=mongoose.Schema;

var CategorySchema=new Schema({

   products:{
       type:Object,
       required:true
   },
   titlehead:{
       type:String,
       required:true
   },


});
module.exports=CategorySchema
// module.exports=mongoose.model('Product', ProductsSchema)