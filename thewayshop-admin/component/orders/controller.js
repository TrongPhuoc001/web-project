
const service = require('./service');

const view = '../component/orders/view/';
exports.viewOrders = async function(req, res) {

  const page = parseInt(req.query.page)||1;
  const column_name = await service.getColumnName('orders');
  const record = await service.getRecord(page, 'orders');
  let max_page = await service.maxPage('orders');
  max_page = parseInt(max_page.rows[0].max_page);
  return res.render(view+'orders',{
    title:`Data for orders`,
    table_name:`orders`,
    column_name:column_name.rows,
    record: record.rows,
    order_active:true,
    page:page,
    next:page<max_page?page+1 : false,
    pages:Array.from({length: max_page}, (v, k) => k+1),
    previous:page>1?page-1:false
  })

};

exports.editOrders = async (req,res)=>{

  const {recordId}= req.query;
  const data = await service.recordData('orders',recordId);
  
  delete (await data).rows[0].id;
  res.render(view+'edit_orders',{
    title:`Edit table Orders}`,
    table_name:`orders`,
    record_id:recordId,
    record:data.rows[0],
    order_active:true
  })
}