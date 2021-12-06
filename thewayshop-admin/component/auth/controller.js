const passport = require("../../passport/passportConfig");
const authService = require('./service');

const view = '../component/auth/view/';

exports.loginGet = (req,res)=>{
    return res.render(view+'login',{layout:false,title:'Login'});
}

exports.loginPost = passport.authenticate('local', { 
                                successRedirect: '/',
                                failureRedirect: '/login',
                                failureFlash: true 
                            });

exports.logout = (req,res)=>{
    req.logout();
    res.redirect('/login');
}

