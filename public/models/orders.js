const mongoose=require('mongoose')
var Schema=mongoose.Schema;

var OrderSchema=new Schema({
   user:{
       type:Schema.Types.ObjectId,
       ref: 'Member'
   },
   cart:{
       type:Object,
       required:true
   },
   address:{
       type:String,
       required:true
   },
   name:{
       type:String,
       required:true
   },
   paymentId:{
    type:String,
    required:true
   }


});
module.exports=OrderSchema
// module.exports=mongoose.model('Product', ProductsSchema)