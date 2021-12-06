
const tableModel = require('../models/table');
const chatModel = require('../models/chat');

module.exports = async(req,res,next)=>{
    
    const tables = ['manager','user','product','tag','tag_category','category','orders','wishlist','cart','order_product'];
    const chat = await chatModel.getChat;
    res.locals.tables = tables;
    res.locals.chat = chat.rows;
    
    next();
}