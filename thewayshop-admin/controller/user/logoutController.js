exports.get = (req,res)=>{
    return res.cookie('is_authenticated',false).redirect('/users/login');
}