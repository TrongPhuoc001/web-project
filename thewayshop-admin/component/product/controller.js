const productModel = require('../../models/product');
const {productCache} = require('../../config/lruCache');
const service = require('./service')
const view = '../component/product/view/';

exports.get = async (req,res)=>{
    const page = Math.max(parseInt(req.query.page)||1,1);

    let max_page = productCache.get(`product_maxpage`);
    if(!max_page){
        const getMaxPage = await productModel.maxPage;
        max_page = getMaxPage.rows[0].max_page;
        productCache.set(`product_maxpage`,max_page);
    }
    let product_page = productCache.get(`product_page${page}`);
    if(!product_page){
        const products = await productModel.getAll(parseInt(page));
        product_page = products.rows;
        productCache.set(`product_page${page}`,product_page);
    }
    

    res.render(view+'productpage', { 
        title: 'TheWayShop Product',
        head:'All Product',
        products:product_page,
        page:page,
        max_page:max_page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false,
        product_active:true
    });
}
exports.getProduct = async (req,res)=>{

    const {product_id} = req.params;
    const product = await productModel.getOne(product_id);
    const taglist = await service.getTag;
    const subimage = await service.getSubImage(product_id);
    if(subimage.rows.length === 0){
        const temp = [
            {
                'image':''
            },
            {
                'image':''
            }
        ];
        subimage.rows = temp;
    }
    res.render(view+'productEdit', { 
        title: product.rows[0].title,
        product:product.rows[0],
        tagList:taglist.rows,
        subimage:subimage.rows,
        product_active:true
    });
}

exports.postProduct = async (req,res)=>{
    const {title,description,price,image,brand,tag_id,available} = req.body;
    try{
        await service.updatePro(req.params.product_id,title,description,price,image,brand,tag_id,available);
        res.redirect(`/product/${req.params.product_id}`)
    }
    catch(err){
        console.log(err);
        const product = await productModel.getOne(product_id);
        res.render(view+'productEdit', { 
            title: product.rows[0].title,
            product:product.rows[0],
            message:'Update faile:'+err.routine,
            product_active:true
        });
    }
}

exports.getAddProduct = async (req,res)=>{

    const product = {
        title:'product name',
        description:'some thing to say about the product',
        price:'price of the product',
        image:'product image',
        brand:'Brand of the product',
        tag_id:'Id of 1 of the tag',
        available:'Have in store',
        sold:'Have sold'
    }
    res.render(view+'productAdd', { 
        title: 'New product',
        product:product,
        product_active:true
    });
}

exports.postAddProduct = async(req,res)=>{
    const product = {
        title:'product name',
        description:'some thing to say about the product',
        price:'price of the product',
        image:'product image',
        brand:'Brand of the product',
        tag_id:'Id of 1 of the tag',
        available:'Have in store',
        sold:'Have sold'
    }
    try{
        const {title,description,price,image,subimage1,subimage2,brand,tag_id,available,sold} = req.body
        const newProId = await service.addPro(title,description,price,image,brand,tag_id,available,sold)
        if(!subimage1)subimage1='';
        if(!subimage2)subimage2='';
        await service.addSubImage(newProId.rows[0].id,subimage1,subimage2)
        res.render(view+'productAdd', { 
            title: 'New product',
            product:product,
            message:'Add success',
            new_pro_id:newProId.rows[0].id,
            product_active:true
        });
    }
    catch(err){
        res.render(view+'productAdd', { 
            title: 'New product',
            product:product,
            error:err.routine,
            product_active:true
        });
    }
}

exports.searchProduct = async (req,res)=>{

    let {q,page} = req.query;
    page = Math.max(parseInt(page)||1,1);

    const search_result = await productModel.searchName(q,page);
    let max_page = await productModel.countName(q);
    max_page = max_page.rows[0].max_page;

    res.render(view+'productpage',{
        title: 'Search',
        head : 'Search : '+q,
        products:search_result.rows,
        q:q,
        page:page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false,
        product_active:true
    })
}

exports.delete = async(req,res)=>{
    const {id} = req.params;
    if(!id) throw false;

   await productModel.delete(id);

    res.redirect('/product')
}