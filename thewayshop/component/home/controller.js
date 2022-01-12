
const service = require('./service')
const view = '../component/home/view/'
const {layout_cache} = require('../../helper/lruCache');
exports.homePage = async (req,res)=>{
    const recent_pro = await service.getRecent;
    const top_pro = await service.getTopSelling;
    res.render(view+'index', { 
        title: 'The Way Shop', 
        recent_product: recent_pro.rows,
        top_pro:top_pro.rows
      });
}

exports.search = async(req,res)=>{
  let {q,tag,brand,price} = req.query;
  let page = Math.max(parseInt(req.query.page)||1,1);
  if(!q){
    q='';
  }
  if(!tag){
    tag=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  }
  if(!brand){
    brand='';
  }
  const priceLow = parseInt(price.split('-')[0].slice(1));
  const priceHigh = parseInt(price.split('-')[0].slice(2));
  const result = await service.searchProduct(q,tag,brand,priceLow,priceHigh,page);
  return res.render(view+'search',{
    title:'Search',
    search_product:result.rows
  });
}