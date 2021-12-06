const productModel = require('../../models/product');
const categoryModel = require('../../models/category');
const tagModel = require('../../models/tag');


const view = '../component/home/view/'

exports.homePage = async (req,res)=>{
    const recent_pro = await productModel.getRecent;
    res.render(view+'index', { 
        title: 'The Way Shop', 
        recent_product: recent_pro.rows
      });
}