const service = require('./service')

exports.getRating = async(req,res)=>{
    const page = Math.max(parseInt(req.query.page)||1,1);
    const product_id = req.query.proid;
    try{
        const rating = await service.getRating(product_id,page);
        res.status(200).json(rating.rows)
    }
    catch(e){
        res.status(400).json(e)
    }

}

exports.postRating = async(req,res)=>{
    if(!req.user){
        res.status(400).json({error:"login required"})
    }
    const user_id = req.user.id;
    const {product_id,star,content} = req.body;
    try{
        const rating = await service.addRating(user_id,product_id,star,content);
        res.status(200).json(rating.rows[0])
    }
    catch(e){
        res.status(400).json(e);
    }

}