module.exports = (req,res,next)=>{
    const isAuth = req.cookies.is_authenticated;
    if(isAuth){
        next()
    }
    else {
        res.redirect('/users/login');
    }
}