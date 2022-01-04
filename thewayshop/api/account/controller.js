
const service = require('./service')
const sendEmail = require('../../helper/sendEmail')

exports.accExist = async(req,res)=>{
    const {email} = req.body;
    try{
        const user_id = await service.findOne(email);
        if(user_id.rows.length>0){
            res.status(200).json('existed');
        }
        else{
            res.status(200).json('available');
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
}


exports.resend = async(req,res)=>{
    const {email} = req.body;
    const user_id = await service.findOne(email);
    if(user_id.rows.length >0){
        const baseurl =  req.protocol + '://' + req.get('host') + '/confirmation/';
        sendEmail(user_id.rows[0].id,email,baseurl)
        res.status(200).json('success')
    }
    else{
        res.status(400).json({error:"email not found"})
    }
}
exports.forgot = async(req,res)=>{
    const {email} = req.body;
    const user_id = await service.findOne(email);
    if(user_id.rows.length >0){
        const baseurl =  req.protocol + '://' + req.get('host') + '/changepass/';
        sendEmail(user_id.rows[0].id,email,baseurl)
        res.status(200).json('success')
    }
    else{
        res.status(400).json({error:"email not found"})
    }
}

exports.getWishList = async(req,res)=>{
    const user_id = req.params.user_id;
    const page = Math.max(parseInt(req.query.page)||1,1);
    try{
        const data = await service.getWishlist(user_id,page);
        res.status(200).json(data.rows);
    }
    catch(e){
        res.status(400).json(e);
    }
}
exports.postWishList = async(req,res)=>{
    const {user_id,pro_id} = req.body;
    try{
        await service.addWishList(user_id,pro_id);
        res.status(200).json('success');
    }
    catch(e){
        res.status(400).json(e);
    }
}