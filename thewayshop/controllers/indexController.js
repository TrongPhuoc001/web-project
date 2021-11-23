const productModel = require('../models/product');
const categoryModel = require('../models/category');
const tagModel = require('../models/tag');


exports.homePage = async (req,res)=>{
    const recent_pro = await productModel.getRecent;
    const categories = await categoryModel.getAll(4);
    const category_nav = []
    for await(const cate of categories.rows){
        const tag = await tagModel.getTagCate(cate.id);
        category_nav.push({
            name:cate.name,
            tags:tag.rows
        })
    } 
    res.render('index', { 
        title: 'The Way Shop', 
        coupons:['Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20','Off 50%! Shop Now','Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20'],
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
        ],
        categories:category_nav,
        recent_product: recent_pro.rows
      });
}