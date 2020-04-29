var Category=require('../models/categories')
var ProductsSchema=require('../models/product')

var mongoose=require('mongoose')

var Product = mongoose.model("Product", ProductsSchema);

mongoose.connect("mongodb+srv://monchu:monchu@cluster0-dgfgi.mongodb.net/Grocery?retryWrites=true&w=majority");//creating or joining to practice database

productChunks = [];
Product.find(function (err, docs) {
   
    for (var i = 0; i < docs.length; i++) {
        productChunks.push(docs);
    }
})

var Categories=new Category({
        titlehead:'Beverages',
        products:productChunks
    })

Categories.save()

mongoose.disconnect()

// var done=0;

// for (var i=0;i<beverages.length;i++){
//     beverages[i].save(function(err,result){
//         done++;
//         if(done===beverages.length){
//             exit();
//         }
//     });
// }

// function exit(){
//     mongoose.disconnect();
// }