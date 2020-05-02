// var Product=require('../models/product')

// var mongoose=require('mongoose')

// mongoose.connect("mongodb+srv://monchu:monchu@cluster0-dgfgi.mongodb.net/Grocery?retryWrites=true&w=majority");//creating or joining to practice database

// var fruits_and_veggies=[
//     new Product({
//         imagePath:'https://i0.wp.com/freshmarket.co.in/wp-content/uploads/2019/10/APPLE-QUEEN-03.jpg?fit=500%2C500&ssl=1',
//         title:'Apple',
//         description: 'Awsome Apple!!!',
//         quantity:'1 kq',
//         price:100
//     }),
//     new Product({
//         imagePath:'https://communityfarm.in/wp-content/uploads/2018/05/Carrot_nati.jpg',
//         title:'Carrot',
//         description: 'Awsome carrots!!!',
//         quantity:'1 kg',
//         price:30
//     }),
//     new Product({
//         imagePath:'https://i2.wp.com/www.homsist.com/wp-content/uploads/2017/12/6-2-kiwi-green.jpg?fit=500%2C500&ssl=1',
//         title:'Kiwi',
//         description: 'Awsome kiwi!!!',
//         quantity:'1 piece',
//         price:25
//     }),
//     new Product({
//         imagePath:'https://5.imimg.com/data5/LT/WU/DJ/SELLER-81819127/a-grade-fresh-strawberry-500x500.jpg',
//         title:'Strawberry',
//         description: 'Awsome fruit!!!',
//         quantity:'500 gm',
//         price:80
//     }),
//     new Product({
//         imagePath:'https://images-na.ssl-images-amazon.com/images/I/41S4xXyjIzL.jpg',
//         title:'Guava',
//         description: 'Awsome guava!!!',
//         quantity:'1 kg',
//         price:50
//     }),
//     new Product({
//         imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRA8s3Stm6OffDeoqPkr4cFOeqCen9zsO_Tpn2sikkhA6kkaWW1&usqp=CAU',
//         title:'Cauliflower',
//         description: 'Awsome veggie!!!',
//         quantity:'1 kg',
//         price:15
//     }),
//     new Product({
//         imagePath:'https://5.imimg.com/data5/IY/KE/MY-17706234/salad-onions-500x500.jpg',
//         title:'Onion',
//         description: 'Awsome Onion!!!',
//         quantity:'1 kg',
//         price:25
//     }),
//     new Product({
//         imagePath:'https://images-na.ssl-images-amazon.com/images/I/41VijSTQuGL.jpg',
//         title:'Potato',
//         description: 'Awsome potato!!!',
//         quantity:'1 kg',
//         price:20
//     }),

// ];
// var done=0;

// for (var i=0;i<fruits_and_veggies.length;i++){
//     fruits_and_veggies[i].save(function(err,result){
//         done++;
//         if(done===fruits_and_veggies.length){
//             exit();
//         }
//     });
// }

// function exit(){
//     mongoose.disconnect();
// }