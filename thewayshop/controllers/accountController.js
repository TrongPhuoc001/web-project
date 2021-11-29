const view = "account/"

exports.myaccount = (req,res)=>{
    res.render(view+'myaccountList', { title: 'My Account', 
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