// var Product=require('../models/product')

// var mongoose=require('mongoose')

// mongoose.connect("mongodb+srv://monchu:monchu@cluster0-dgfgi.mongodb.net/Grocery?retryWrites=true&w=majority");//creating or joining to practice database

// var beverages=[
//     new Product({
//         imagePath:'https://www.austriansupermarket.com/media/catalog/product/cache/2/image/800x800/9df78eab33525d08d6e5fb8d27136e95/n/e/nes1036_2.jpg',
//         title:'Nescafe coffee',
//         description: 'Awsome Coffee!!!',
//         quantity:'100 gm',
//         price:150
//     }),
//     new Product({
//         imagePath:'https://www.kirana.store/image/cache/catalog/METRO%20IMAGES/TAJ%20MAHAL%20TEA%20TOPTAINER%201KG-500x500.jpg',
//         title:'Taj mahal tea',
//         description: 'Awsome Tea!!!',
//         quantity:'100 gm',
//         price:100
//     }),
//     new Product({
//         imagePath:'https://images-na.ssl-images-amazon.com/images/I/71sIstrNeuL._SL1500_.jpg',
//         title:'Real orange juice',
//         description: 'Awsome juice!!!',
//         quantity:'500 ml',
//         price:90
//     }),
//     new Product({
//         imagePath:'https://images-na.ssl-images-amazon.com/images/I/61QbtCPl0fL._SX425_PIbundle-15,TopRight,0,0_AA425SH20_.jpg',
//         title:'Tropicana strawberry juice',
//         description: 'Awsome Juice!!!',
//         quantity:'500 ml',
//         price:90
//     }),
//     new Product({
//         imagePath:'https://images-na.ssl-images-amazon.com/images/I/81ZjwgoneSL._SY606_.jpg',
//         title:'Tropicana guava juice',
//         description: 'Awsome Juice!!!',
//         quantity:'500 ml',
//         price:90
//     }),
//     new Product({
//         imagePath:'https://vataav.com/wp-content/uploads/2018/05/Real-Mixed-Fruit-Juice.jpg',
//         title:'Tropicana Mixed fruit juice',
//         description: 'Awsome Juice!!!',
//         quantity:'500 ml',
//         price:90
//     }),
//     new Product({
//         imagePath:'https://www.bazaarfresh.in/wp-content/uploads/real-cranberry.jpg',
//         title:'Tropicana cranberry juice',
//         description: 'Awsome Juice!!!',
//         quantity:'500 ml',
//         price:90
//     }),
//     new Product({
//         imagePath:'https://padelasuperstore.in/wp-content/uploads/2019/01/1-amulya-milk-powder-amul-original-imafba3dng5bwjzz.jpeg',
//         title:'Amul milk powder',
//         description: 'Awsome milk!!!',
//         quantity:'500 gm',
//         price:170
//     }),

// ];
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