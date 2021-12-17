
const service = require('./service')
const sendEmail = require('../../config/sendEmail')


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