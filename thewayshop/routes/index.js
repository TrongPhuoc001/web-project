var express = require('express');
const app = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'The Way Shop', 
    coupons:['Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20','Off 50%! Shop Now','Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20'],
    categories:[
      {
        name:'Top',
        tags:['Jackets','Shirts','Sweaters & Cardigans','T-shirts']
      },
      {
        name:'Bottom',
        tags:['Swimwear','Skirts','Jeans','Trousers']
      },
      {
        name:'Clothing',
        tags:['Top Wear','Party wear','Bottom Wear','Indian Wear']
      },
      {
        name:'Accessories',
        tags:['Bags','Sunglasses','Fragrances','Wallets']
      }
    ],
    index_cate:[
      [{
        image:'images/t-shirts-img.jpg',
        name:'T-shirts'
      },
      {
        image:'images/shirt-img.jpg',
        name:'Shirt'
      }]
      ,
      [{
        image:'images/wallet-img.jpg',
        name:'Wallet'
      },
      {
        image:'images/women-bag-img.jpg',
        name:'Bags'
      }],
      [{
        image:'images/shoes-img.jpg',
        name:'Shoes'
      },
      {
        image:'images/women-shoes-img.jpg',
        name:'Women Shoes'
      }]
    ]
  });
});

module.exports = router;

