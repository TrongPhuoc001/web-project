const service = require('./service');

const view = "../component/account/view/";

exports.myaccount = (req,res)=>{
    res.render(view+'myaccountList', { 
        title: 'My Account', 
    });
}

exports.cart = (req,res)=>{
    res.render(view+'cartList', { 
        title: 'Cart', 
    });
}

exports.checkout = (req,res)=>{
    res.render(view+'checkoutList', { 
        title: 'Check Out', 
    });
}

exports.wishlist = (req,res)=>{
    res.render(view+'wishlistList', { 
        title: 'Wish List', 
    });
}

exports.profile = async (req,res)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    const user_id = req.user.id;
    const user_info = await service.profile(user_id);

    return res.render(view+'profile',{
        title:'My profile',
        user_info:user_info.rows[0]
    })
}

exports.editProfile = async(req,res)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    const user_id = req.user.id;
    const {name,birthday,address,image} = req.body;
    try{
        console.log(name,birthday,address,image,user_id);
        const user_info = await service.editProfile(name,birthday,address,image,user_id);
        return res.render(view+'profile',{
            title:'My profile',
            user_info:user_info.rows[0]
        })
    }
    catch(e){
        console.log(e);
        res.send('error');
    }

}