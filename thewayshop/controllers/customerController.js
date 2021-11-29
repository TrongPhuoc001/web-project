const view = "customer/"

exports.cart = (req,res)=>{
    res.render(view+'cartList', { title: 'Cart', 
    coupons:['Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20','Off 50%! Shop Now','Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20'],
    categories:[
        {
        name:'Top',
        tags:['Jackets','Shirts','Sweaters & Cardigans','T-shirts']
        },
        {
        name:'Bottom',
        tags:['Swimwear','Skirts','Jeans','Trousers']
        },
        {
        name:'Clothing',
        tags:['Top Wear','Party wear','Bottom Wear','Indian Wear']
        },
        {
        name:'Accessories',
        tags:['Bags','Sunglasses','Fragrances','Wallets']
        }
    ]
    });
}

exports.checkout = (req,res)=>{
    res.render(view+'checkoutList', { title: 'Check Out', 
    coupons:['Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20','Off 50%! Shop Now','Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20'],
    categories:[
        {
        name:'Top',
        tags:['Jackets','Shirts','Sweaters & Cardigans','T-shirts']
        },
        {
        name:'Bottom',
        tags:['Swimwear','Skirts','Jeans','Trousers']
        },
        {
        name:'Clothing',
        tags:['Top Wear','Party wear','Bottom Wear','Indian Wear']
        },
        {
        name:'Accessories',
        tags:['Bags','Sunglasses','Fragrances','Wallets']
        }
    ]
    });
}

exports.wishlist = (req,res)=>{
    res.render(view+'wishlistList', { title: 'Wish List', 
    coupons:['Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20','Off 50%! Shop Now','Off 10%! Shop Now Man','50% - 80% off on Fashion','20% off Entire Purchase Promo code: offT20'],
    categories:[
        {
        name:'Top',
        tags:['Jackets','Shirts','Sweaters & Cardigans','T-shirts']
        },
        {
        name:'Bottom',
        tags:['Swimwear','Skirts','Jeans','Trousers']
        },
        {
        name:'Clothing',
        tags:['Top Wear','Party wear','Bottom Wear','Indian Wear']
        },
        {
        name:'Accessories',
        tags:['Bags','Sunglasses','Fragrances','Wallets']
        }
    ]
    });
}