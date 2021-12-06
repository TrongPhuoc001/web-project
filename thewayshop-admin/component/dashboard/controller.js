const chatModel = require('../../models/chat')
const productModel = require('../../models/product')
const userModel = require('../../models/user')
const tableModel = require('../../models/table')

const view = '../component/dashboard/view/';
exports.get = async (req,res)=>{

    const member = await userModel.getMember;

    const products = await productModel.getRecent;
    res.render(view+'index', { 
        title: 'TheWayShop Adminsite',
        team_members:member.rows,
        products:products.rows,
        dashboard_active:true,
    });
}