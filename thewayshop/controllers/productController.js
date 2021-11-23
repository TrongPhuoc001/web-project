const productModel = require('../models/product');
const categoryModel = require('../models/category');
const tagModel = require('../models/tag');

exports.mainPage = async(req,res)=>{
    const categories = await categoryModel.getAll(4);
    const category_nav = []
    for await(const cate of categories.rows){
        const tag = await tagModel.getTagCate(cate.id);
        category_nav.push({
            id:cate.id,
            name:cate.name,
            tags:tag.rows
        })
    } 
    const page = parseInt(req.query.page)||1;
    const products = await productModel.getAll(page);
    let max_page = await productModel.maxPage;
    max_page = parseInt(max_page.rows[0].max_page);
    const brands = await productModel.getBrand;
    res.render('productList', { 
        title: 'All Product', 
        coupons:['Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20','Off 50%! Shop Now','Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20'],
        categories:category_nav,
        products:products.rows,
        brands:brands.rows,
        page:page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false
      });
}

exports.proDetail = async (req,res)=>{
    const categories = await categoryModel.getAll(4);
    const category_nav = []
    for await(const cate of categories.rows){
        const tag = await tagModel.getTagCate(cate.id);
        category_nav.push({
            id:cate.id,
            name:cate.name,
            tags:tag.rows
        })
    }
    const pro_id = req.params.product_id;
    const product = await productModel.getOne(pro_id);
    const relate = await productModel.getRelate(pro_id,product.rows[0].tag_id,product.rows[0].brand)
    res.render('productDetail',{
        title: product.rows[0].title, 
        coupons:['Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20','Off 50%! Shop Now','Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20'],
        categories:category_nav,
        product:product.rows[0],
        products:relate.rows
    })
}

exports.filterCategory = async (req,res)=>{
    const categories = await categoryModel.getAll(4);
    const category_nav = []
    for await(const cate of categories.rows){
        const tag = await tagModel.getTagCate(cate.id);
        category_nav.push({
            id:cate.id,
            name:cate.name,
            tags:tag.rows
        })
    }
    const cate_id = req.params.cate_id;
    const page = parseInt(req.query.page)|1;
    const products = await productModel.getCatePro(cate_id,page);
    const brands = await productModel.getBrand;
    let max_page = await productModel.maxPageCate(cate_id);
    max_page = max_page.rows[0].max_page;
    res.render('productList', { 
        title: 'All Product', 
        coupons:['Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20','Off 50%! Shop Now','Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20'],
        categories:category_nav,
        products:products.rows,
        brands:brands.rows,
        page:page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false
      });
}

exports.filterTag = async (req,res)=>{
    const categories = await categoryModel.getAll(4);
    const category_nav = []
    for await(const cate of categories.rows){
        const tag = await tagModel.getTagCate(cate.id);
        category_nav.push({
            id:cate.id,
            name:cate.name,
            tags:tag.rows
        })
    }
    const tag_id = req.params.tag_id;
    const page = parseInt(req.query.page)|1;
    const products = await productModel.getTagPro(tag_id,page);
    const brands = await productModel.getBrand;
    let max_page = await productModel.maxPageTag(tag_id);
    max_page = max_page.rows[0].max_page;
    res.render('productList', { 
        title: 'All Product', 
        coupons:['Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20','Off 50%! Shop Now','Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20'],
        categories:category_nav,
        products:products.rows,
        brands:brands.rows,
        page:page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false
      });
}