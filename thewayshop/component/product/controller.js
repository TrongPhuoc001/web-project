const {product_cache,filter_cache} = require('../../helper/lruCache'); 
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
        max_page:max_page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false
      });
}

exports.proDetail = async (req,res)=>{

    const pro_id = req.params.product_id;
    const product = await service.getOne(pro_id);
    const relate = await service.getRelate(pro_id);
    const pro_image = await service.getProImage(pro_id);
    const numberRating = await service.numberRating(pro_id);
    const numberComment = await service.numerComment(pro_id);
    res.render(view+'productDetail',{
        title: product.rows[0].title, 
        product:product.rows[0],
        products:relate.rows,
        number_rating:numberRating.rows[0].max_rating,
        number_comment:numberComment.rows[0].max_comment,
        pro_image:pro_image.rows
    })
}

exports.filterCategory = async (req,res)=>{
   
    const cate_name = req.params.category_name;
    const page = Math.max(parseInt(req.query.page)||1,1);

    let product_page = filter_cache.get(`${cate_name}_page${page}`);
    if(!product_page){
        try{
            const products = await service.getCatePro(cate_name,page);
            product_page = products.rows;
            filter_cache.set(`${cate_name}_page${page}`,product_page)
        }
        catch(e){
            return res.status(500).json(e)
        }
    }

    let brands = product_cache.get('brands');
    if(!brands){
        const data_brands = await service.getBrand;
        brands = data_brands.rows;
        product_cache.set('brands',brands);
    }
    let max_page = filter_cache.get(`${cate_name}_max_page`);
    if(!max_page){
        let max_page_data = await service.maxPageCate(cate_name);
        max_page = max_page_data.rows[0].max_page;
        filter_cache.set(`${cate_name}_max_page`,max_page);
    }
    
    res.render(view+'productList', { 
        title: cate_name, 
        products:product_page,
        brands:brands,
        page:page,
        max_page:max_page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false
      });
}

exports.filterTag = async (req,res)=>{
    const tag_name = req.params.tag_name;
    const page = Math.max(parseInt(req.query.page)||1,1);

    let product_page = filter_cache.get(`${tag_name}_page${page}`);
    if(!product_page){
        try{
            const products = await service.getTagPro(tag_name,page);
            product_page = products.rows;
            filter_cache.set(`${tag_name}_page${page}`,product_page)
        }
        catch(e){
            return res.status(500).json(e)
        }
    }

    let brands = product_cache.get('brands');
    if(!brands){
        const data_brands = await service.getBrand;
        brands = data_brands.rows;
        product_cache.set('brands',brands);
    }
    let max_page = filter_cache.get(`${tag_name}_max_page`);
    if(!max_page){
        let max_page_data = await service.maxPageTag(tag_name);
        max_page = max_page_data.rows[0].max_page;
        filter_cache.set(`${tag_name}_max_page`,max_page);
    }

    res.render(view+'productList', { 
        title: tag_name, 
        products:product_page,
        brands:brands,
        page:page,
        max_page:max_page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false
      });
}