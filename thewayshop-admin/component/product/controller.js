const productModel = require('../../models/product');

const view = '../component/product/view/';

exports.get = async (req,res)=>{
    const page = Math.max(parseInt(req.query.page)||1,1);
    let max_page = await productModel.maxPage;
    max_page = max_page.rows[0].max_page;
    const products = await productModel.getAll(parseInt(page));

    res.render(view+'productpage', { 
        title: 'TheWayShop Product',
        head:'All Product',
        products:products.rows,
        page:page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false,
        product_active:true
    });
}
exports.getProduct = async (req,res)=>{

    const {product_id} = req.params;
    const product = await productModel.getOne(product_id);
    res.render(view+'productEdit', { 
        title: product.rows[0].title,
        product:product.rows[0],
        product_active:true
    });
}

exports.postProduct = async (req,res)=>{

    try{
        await productModel.updatePro(req.params.product_id,req.body);
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
        const newProId = await productModel.addPro(req.body)
        console.log(newProId.rows[0].id)
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

    const page = 1;
    let max_page = await productModel.maxPage;
    max_page = max_page.rows[0].max_page;
    const products = await productModel.getAll(parseInt(page));

    res.redirect('/product')
}