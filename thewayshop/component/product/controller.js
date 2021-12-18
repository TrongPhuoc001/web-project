const LRU = require("lru-cache")
  , options = { max: 500
              , length: function (n, key) { return n * 2 + key.length }
              , dispose: function (key, n) { n='' }
              , maxAge: 1000 * 60 * 60 }
  , product_cache = new LRU(options)
  , filter_cache = new LRU(options);
const view = '../component/product/view/'


const productModel = require('../../models/product');
const service = require('./service');


exports.mainPage = async(req,res)=>{
    
    const page = Math.max(parseInt(req.query.page)||1,1);
    let product_page = product_cache.get(`product_page${page}`);
    if(!product_page){
        const products = await productModel.getAll(page);
        product_page = products.rows;
        product_cache.set(`product_page${page}`,product_page)
    }
    let max_page = product_cache.get('max_product_page');
    if(!max_page){
        let max_page_data = await productModel.maxPage;
        max_page = parseInt(max_page_data.rows[0].max_page);
        product_cache.set('max_product_page',max_page);
    }
    let brands = product_cache.get('brands');
    if(!brands){
        const data_brands = await productModel.getBrand;
        brands = data_brands.rows;
        product_cache.set('brands',brands);
    }
    
    res.render(view+'productList', { 
        title: 'All Product', 
        products:product_page,
        brands:brands,
        page:page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false
      });
}

exports.proDetail = async (req,res)=>{

    const pro_id = req.params.product_id;
    const product = await productModel.getOne(pro_id);
    const relate = await productModel.getRelate(pro_id,product.rows[0].tag_id,product.rows[0].brand);
    const pro_image = await service.getProImage(pro_id);
    const numberRating = await service.numberRating(pro_id);
    res.render(view+'productDetail',{
        title: product.rows[0].title, 
        product:product.rows[0],
        products:relate.rows,
        number_rating:numberRating.rows[0].max_rating,
        pro_image:pro_image.rows
    })
}

exports.filterCategory = async (req,res)=>{
   
    const cate_name = req.params.category_name;
    let cate_id = 0
    try{
        cate_id = await service.getCateId(cate_name)
        cate_id = cate_id.rows[0].id
    }
    catch(err){
        return res.render('error',{
            error:err
        })
    }
    const page = Math.max(parseInt(req.query.page)||1,1);
    const products = await productModel.getCatePro(cate_id,page);
    const brands = await productModel.getBrand;
    let max_page = await productModel.maxPageCate(cate_id);
    max_page = max_page.rows[0].max_page;
    console.log(cate_id,page,products.rows);
    res.render(view+'productList', { 
        title: cate_name, 
        products:products.rows,
        brands:brands.rows,
        page:page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false
      });
}

exports.filterTag = async (req,res)=>{
    const tag_name = req.params.tag_name;
    let tag_id = 0
    try{
        tag_id = await service.getTagId(tag_name)
        tag_id = tag_id.rows[0].id
    }
    catch(err){
        return res.render('error',{
            error:err
        })
    }
    const page = Math.max(parseInt(req.query.page)||1,1);
    const products = await productModel.getTagPro(tag_id,page);
    const brands = await productModel.getBrand;
    let max_page = await productModel.maxPageTag(tag_id);
    max_page = max_page.rows[0].max_page;
    res.render(view+'productList', { 
        title: tag_name, 
        products:products.rows,
        brands:brands.rows,
        page:page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false
      });
}