
const categoryModel = require('../models/category');
const tagModel = require('../models/tag');

const category_nav = [];

module.exports = async(req,res,next)=>{
    const coupons=['Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20','Off 50%! Shop Now','Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20'];
    if(category_nav.length===0){
        const categories = await categoryModel.getAll(4);
        for await(const cate of categories.rows){
            const tag = await tagModel.getTagCate(cate.id);
            category_nav.push({
                id:cate.id,
                name:cate.name,
                tags:tag.rows
            })
        }
    }
     
    res.locals.coupons = coupons;
    res.locals.categories = category_nav;
    next();
}