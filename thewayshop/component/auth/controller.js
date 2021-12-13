const bcrypt = require('bcrypt');

const passport = require('../../config/passport');
const service = require('./service');
const {registerValid} = require('../../config/joiValidation');

const view = '../component/auth/view/';

exports.login = async (req,res)=>{
    res.render(view+'login', { 
        title: 'Login', 
        error: req.query.error?"Invalid email or password":""
    })
}

exports.auth = passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login?error=true'
});

exports.register = async(req,res)=>{
    const {error} = registerValid(req.body);
    if(error){ 
        return res.render(view+'login', { 
            title: 'Login', 
            error:'Sign up not success :'+ error.details[0].message
        })
    }
    const {email,password,name,birthday,address}= req.body;
    const hashedpassword = await bcrypt.hash(password,10);
    try{
        await service.register(email,hashedpassword,name,birthday,address);
        return res.render(view+'login', { 
            title: 'Login', 
            message: 'Sign up success, you can sign in now.'
        })
    }
    catch(err){
        return res.render(view+'login', { 
            title: 'Login', 
            error:err
        })
    }
}

exports.logout = (req,res)=>{
    req.logout();
    res.redirect('/');
}