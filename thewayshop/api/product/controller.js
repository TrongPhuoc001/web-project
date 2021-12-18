const {product_cache,filter_cache,rating_cache} = require('../../helper/lruCache');

const service = require('./service')

exports.getRating = async(req,res)=>{
    const page = Math.max(parseInt(req.query.page)||1,1);
    const product_id = req.query.proid;
    let rating_page = rating_cache.get(`${product_id}_page${page}`);
    if(!rating_page){
        try{
            const rating = await service.getRating(product_id,page);
            rating_page = rating.rows;
            rating_cache.set(`${product_id}_page${page}`,rating_page);
        }
        catch(e){
            return res.status(400).json(e)
        }
    }
    res.status(200).json(rating_page)

}

exports.postRating = async(req,res)=>{
    if(!req.user){
        res.status(400).json({error:"login required"})
    }
    const user_id = req.user.id;
    const {product_id,star,content} = req.body;
    try{
        const rating = await service.addRating(user_id,product_id,star,content);
        let page = 1;
        while(rating_cache.get(`rating${product_id}_page${page}`)){
            rating_cache.set(`rating${product_id}_page${page}`,undefined)
            page++;
        }
        res.status(200).json(rating.rows[0])
    }
    catch(e){
        res.status(400).json(e);
    }

}