const chatModel = require('../../models/chat')
const productModel = require('../../models/product')
const userModel = require('../../models/user')
const tagModel = require('../../models/tag')
const tableModel = require('../../models/table')

const view = '../component/dashboard/view/';
exports.getTopSellingProductByTag = async (req,res)=>{
    const tagId = req.query.id;

    const tagNow = await tagModel.getTagName(tagId);
    const member = await userModel.getMember;
    const tag = await tagModel.getAllTag;
    const products = await productModel.getTopSellingProductByTag(tagId);
    res.render(view+'index', { 
        title: 'TheWayShop Adminsite',
        team_members:member.rows,
        products:products.rows,
        dashboard_active:true,
        tag:tag.rows,
        tagNow:tagNow.rows[0].name
    });
}

exports.getTopSellingProduct = async (req,res)=>{

    const member = await userModel.getMember;
    
    const tag = await tagModel.getAllTag;
    const products = await productModel.getTopSellingProduct;
    res.render(view+'index', { 
        title: 'TheWayShop Adminsite',
        team_members:member.rows,
        products:products.rows,
        dashboard_active:true,
        tag: tag.rows,
        tagNow:'All'
    });
}