const bcrypt = require('bcrypt')
const service = require('./service');

const {profileValid,changepassValid} = require('../../helper/joiValidation')
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

exports.confirm = (req,res)=>{
    res.json(req.body)
    console.log("helo")
}

exports.confirm = async (req,res)=>{
    const order = req.body;
    if(!req.user){
        return res.redirect('/login');
    }
    const user_id = req.user.id;

    const user_info = await service.confirm_order(order,user_id);
    
    if(user_info){
        res.render(view+'status', {title:'status order'})
    }
}

exports.status = (req,res)=>{
    res.render(view+'status', { 
        title: 'status order', 
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

exports.yourorder = (req,res) => {
    res.render(view+'yourorder',{
        title: 'Your order',
    });
}

exports.editProfile = async(req,res)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    const {error} = profileValid(req.body);
    if(error){ 
        return res.render(view+'profile', { 
            title: 'Profile', 
            error:'Invalid infomation:'+ error.details[0].message
        })
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

exports.changepass = async(req,res)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    res.render(view+'changepass');
}

exports.postchangepass = async(req,res)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    const {error} = changepassValid(req.body);
    if(error){ 
        return res.render(view+'changepass', { 
            title: 'Profile', 
            error:'Invalid infomation:'+ error.details[0].message
        })
    }
    const {oldpassword,newpassword} = req.body;
    const user_id = req.user.id;
    const password = await service.getpass(user_id);
    const match = await bcrypt.compare(oldpassword,password.rows[0].password)
    if(!match){
        return res.render(view+'changepass', { 
            title: 'Profile', 
            error:"Invalid infomation: Old password isn't correct."
        })
    }
    const hashedPassword = await bcrypt.hash(newpassword,10);
    try{
        await service.changepass(hashedPassword,user_id);
        return res.render(view+'changepass', { 
            title: 'Profile', 
            message:"Password change successfully."
        })
    }
    catch(e){
        res.send('error')
    }
    
}