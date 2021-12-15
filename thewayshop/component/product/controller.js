const view = '../component/product/view/'

const productModel = require('../../models/product');
const categoryModel = require('../../models/category');

const service = require('./service');
const tagModel = require('../../models/tag');

exports.mainPage = async(req,res)=>{
    
    const page = parseInt(req.query.page)||1;
    const products = await productModel.getAll(page);
    let max_page = await productModel.maxPage;
    max_page = parseInt(max_page.rows[0].max_page);
    const brands = await productModel.getBrand;
    res.render(view+'productList', { 
        title: 'All Product', 
        products:products.rows,
        brands:brands.rows,
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
    res.render(view+'productDetail',{
        title: product.rows[0].title, 
        product:product.rows[0],
        products:relate.rows,
        rating:[
            {
                name:'Phước',
                star:5,
                contain:'asjdahsbf  sadjnfjsdang ajskdgn asdgbansdhgab gasdhgb ashd g'
            },
            {
                name:'Phước',
                star:5,
                contain:'asjdahsbf  sadjnfjsdang ajskdgn asdgbansdhgab gasdhgb ashd g'
            },
            {
                name:'Phước',
                star:5,
                contain:'asjdahsbf  sadjnfjsdang ajskdgn asdgbansdhgab gasdhgb ashd g'
            },
            {
                name:'Phước',
                star:5,
                contain:'asjdahsbf  sadjnfjsdang ajskdgn asdgbansdhgab gasdhgb ashd g'
            },
            {
                name:'Phước',
                star:5,
                contain:'asjdahsbf  sadjnfjsdang ajskdgn asdgbansdhgab gasdhgb ashd g'
            },
            {
                name:'Phước',
                star:5,
                contain:'asjdahsbf  sadjnfjsdang ajskdgn asdgbansdhgab gasdhgb ashd g'
            },
            {
                name:'Phước',
                star:5,
                contain:'asjdahsbf  sadjnfjsdang ajskdgn asdgbansdhgab gasdhgb ashd g'
            },
            {
                name:'Phước',
                star:5,
                contain:'asjdahsbf  sadjnfjsdang ajskdgn asdgbansdhgab gasdhgb ashd g'
            },
        ],
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
    const page = parseInt(req.query.page)||1;
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
        console.log(tag_name)
        tag_id = await service.getTagId(tag_name)
        tag_id = tag_id.rows[0].id
    }
    catch(err){
        return res.render('error',{
            error:err
        })
    }
    const page = parseInt(req.query.page)|1;
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