const userModel = require('../../models/user')
exports.get = (req,res)=>{
    return res.render('login',{layout:false,title:'Login'});
}
exports.post = async (req,res)=>{
    const {username, password} = req.body;
    const result = await userModel.login(username,password);
    if(result.rows && result.rows.length > 0){
    res.cookie('username',username,{maxAge:900000});
    return res.cookie('is_authenticated',true,{maxAge:900000}).redirect('/');
    }
    else{
    return res.render('login',{
        layout:false,
        message:'Wrong username or password',
        title:'Login'
    });
    }
}