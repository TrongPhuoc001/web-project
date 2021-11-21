const chatModel = require('../../models/chat')
const productModel = require('../../models/product')
const userModel = require('../../models/user')
const tableModel = require('../../models/table')
exports.get = async (req,res)=>{
    const username = req.cookies.username;
    const chat = await chatModel.getChat;
    const member = await userModel.getMember;
    const table = await tableModel.table;
    const products = await productModel.getRecent;
    res.render('index', { 
        title: 'TheWayShop Adminsite',
        username: username,
        tables:table.rows,
        user_messages:chat.rows,
        team_members:member.rows,
        products:products.rows
    });
}