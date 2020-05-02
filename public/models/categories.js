const mongoose=require('mongoose')
var schema=mongoose.Schema;

var CategorySchema=new schema({

   products:{
       type:Array,
   },
   titlehead:{
       type:String,
       required:true
   },
   imagePath:{
    type:String,
    required:true
}


});
module.exports = CategorySchema
// module.exports = Category = mongoose.model('Category', CategorySchema)
// module.exports=mongoose.model('Product', ProductsSchema)