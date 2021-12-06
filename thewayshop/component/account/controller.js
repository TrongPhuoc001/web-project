const view = "../component/account/view/"

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