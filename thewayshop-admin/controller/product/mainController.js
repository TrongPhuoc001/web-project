const productModel = require('../../models/product');
const tableModel = require('../../models/table');
const chatModel = require('../../models/chat');




exports.get = async (req,res)=>{
    const username = req.cookies.username;
    const chat = await chatModel.getChat;
    const table = await tableModel.table;  

    const page = parseInt(req.query.page)||1;
    let max_page = await productModel.maxPage;
    max_page = max_page.rows[0].max_page;
    const products = await productModel.getAll(parseInt(page));
    console.log(max_page,Array.from({length: max_page}, (v, k) => k+1))
    res.render('product/productpage', { 
        title: 'TheWayShop Product',
        username: username,
        tables:table.rows,
        user_messages:chat.rows,
        products:products.rows,
        page:page,
        next:page<max_page?page+1 : false,
        pages:Array.from({length: max_page}, (v, k) => k+1),
        previous:page>1?page-1:false
    });
}
exports.getProduct = async (req,res)=>{
    const username = req.cookies.username;
    const chat = await chatModel.getChat;
    const table = await tableModel.table;

    const {product_id} = req.params;
    const product = await productModel.getOne(product_id);
    res.render('product/productEdit', { 
        title: product.rows[0].title,
        username: username,
        tables:table.rows,
        user_messages:chat.rows,
        product:product.rows[0],
    });
}

exports.postProduct = async (req,res)=>{
    const username = req.cookies.username;
    const chat = await chatModel.getChat;
    const table = await tableModel.table;

    try{
        await productModel.updatePro(req.params.product_id,req.body);
        res.redirect(`/product/${req.params.product_id}`)
    }
    catch(err){
        console.log(err);
        const product = await productModel.getOne(product_id);
        res.render('product/productEdit', { 
            title: product.rows[0].title,
            username: username,
            tables:table.rows,
            user_messages:chat.rows,
            product:product.rows[0],
            message:'Update faile:'+err.routine
        });
    }
}

exports.getAddProduct = async (req,res)=>{
    const username = req.cookies.username;
    const chat = await chatModel.getChat;
    const table = await tableModel.table; 

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
    res.render('product/productAdd', { 
        title: 'New product',
        username: username,
        tables:table.rows,
        user_messages:chat.rows,
        product:product,
    });
}

exports.postAddProduct = async(req,res)=>{
    const username = req.cookies.username;
    const chat = await chatModel.getChat;
    const table = await tableModel.table; 
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
        res.render('product/productAdd', { 
            title: 'New product',
            username: username,
            tables:table.rows,
            user_messages:chat.rows,
            product:product,
            message:'Add success',
            new_pro_id:newProId.rows[0].id
        });
    }
    catch(err){
        res.render('product/productAdd', { 
            title: 'New product',
            username: username,
            tables:table.rows,
            user_messages:chat.rows,
            product:product,
            error:err.routine
        });
    }
    
    
}