const productModel = require('../../models/product');


const service = require('./service')

const view = '../component/home/view/'

exports.homePage = async (req,res)=>{
    const recent_pro = await productModel.getRecent;
    res.render(view+'index', { 
        title: 'The Way Shop', 
        recent_product: recent_pro.rows
      });
}