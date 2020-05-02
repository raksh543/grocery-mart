// var Category=require('../models/categories')
// var Product=require('../models/product')

// var mongoose=require('mongoose')


// mongoose.connect("mongodb+srv://monchu:monchu@cluster0-dgfgi.mongodb.net/Grocery?retryWrites=true&w=majority");//creating or joining to practice database

// // productChunks = Product.find({'category':"Beverages"});
// // console.log(productChunks)
// // Product.find({'category':"Beverages"},function (err, docs) {
   
// //     // for (var i = 0; i < docs.length; i++) {
// //     //     productChunks.push(docs);
// //     // }
// //     if(err){
// //         return console.log(err)
// //     }
// //     if(!docs){
// //         return productChunks
// //     }else{
// //         productChunks=docs
// //     }
// //     console.log(productChunks)
// // })

// var Categories=[
//     new Category({
//     titlehead:'Fruits & Vegetables',
//     imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS2-VCywV9jtp-HZjHYrxGlFM5S-kv-28txTqNWr2nEH8xAKIL1&usqp=CAU"
//     }),
//     new Category({
//         titlehead:'Foodgrain, oil & masala',
//         imagePath:"https://valuesupplies.co.za/wp-content/uploads/2016/04/60938_12-in-1-Masala.jpg"
//     }),
//     new Category({
//         titlehead:'Bakery & Dairy',
//         imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfnjNin3K25nxY07DKz4u95DUqogQRX2WRD5K8ZqCdybkgZXhf&usqp=CAU"
//     }),
//     new Category({
//         titlehead:'Snacks & Branded food',
//         imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTmzZ8BIu11qLQAhUgMOBY9hePebeaOalWJLveXTjR5Gr24EDe7&usqp=CAU"
//     }),
//     new Category({
//         titlehead:'Beauty & Hyigene',
//         imagePath:"https://static.toiimg.com/thumb/msid-69820189,imgsize-124659,width-800,height-600,resizemode-75/69820189.jpg"
//     }),
//     new Category({
//         titlehead:'Cleaning & Household',
//         imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmSKmu7aEXVzZNHLl1_mALgqKHcglxrIrSVsXBDJ5R-v8oiOiu&usqp=CAU"
//     }),
//     new Category({
//         titlehead:'Kithchen, garden & pets',
//         imagePath:"https://www.onlinemart.in/pub/media/codazon/slideshow/cache/880x605/k/i/kitchen-garden-_-pets-slide-1.jpg"
//     }),
//     new Category({
//         titlehead:'Eggs, meat & Fish',
//         imagePath:"https://c8.alamy.com/comp/R6DEEK/grocery-and-groceries-symbol-as-a-supermarket-shopping-cart-with-milk-eggs-cheese-meat-bread-fish-vegetables-and-fruit-R6DEEK.jpg"
//     }),
// ]
// var done=0;

// for (var i=0;i<Categories.length;i++){
//     Categories[i].save(function(err,result){
//         done++;
//         if(done===Categories.length){
//             exit();
//         }
//     });
// }

// function exit(){
//     mongoose.disconnect();
// }

