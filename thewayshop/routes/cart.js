var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('aboutus/cartList', { title: 'Cart', 
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
  ]
 });
});

module.exports = router;
