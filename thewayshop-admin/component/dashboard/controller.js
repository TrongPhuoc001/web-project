
const productModel = require('../../models/product')
const service = require('./service')
const tagModel = require('../../models/tag')


const view = '../component/dashboard/view/';

const mon = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
exports.getTopSellingProductByTag = async (req,res)=>{
    const tagId = req.query.id;

    const tagNow = await tagModel.getTagName(tagId);
    const member = await service.getMember;
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

    const member = await service.getMember;
    const tag = await tagModel.getAllTag;
    const visit = await service.getVisit(7);
    const y_axis =[];
    const bar =[];
    if(visit.rows.length>0){
        let max_count = Math.max.apply(Math, visit.rows.map(function(o) { return o._count; }));
        max_count = Math.ceil(max_count/1000)*1000;
        const step = max_count/5;
        for(let i=0;i<6;i++){
            y_axis.push(max_count - i*step);
        }
        visit.rows.forEach(row=>{
            bar.push({
                month:mon[parseInt(row._month)-1],
                value:row._count,
                percent:Math.round(((parseInt(row._count)/max_count)*100)*100)/100
            })
        })
    }

    const soldByTag = await service.soldByTag;
    const label=[],data=[];
    if(soldByTag.rows.length>0){
        soldByTag.rows.forEach(row=>{
            label.push("'"+row.name+"'");
            data.push(row.count);
        })
    }

    const monthlyIncome = await service.monthIncome;

    res.render(view+'index', { 
        title: 'TheWayShop Adminsite',
        team_members:member.rows,
        dashboard_active:true,
        tag: tag.rows,
        tagNow:'All',
        y_axis:y_axis,
        bar:bar,
        label:label,
        data:data,
        month_income: JSON.stringify(monthlyIncome.rows)
    });
}