
const service = require('./service');

const view = '../component/table/view/';
exports.viewTable = async function(req, res) {

  const {tb_name} = req.params;
  const page = parseInt(req.query.page)||1;
  const column_name = await service.getColumnName(tb_name);
  const record = await service.getRecord(page, tb_name);
  console.log(page);
  let max_page = await service.maxPage(tb_name);
  max_page = parseInt(max_page.rows[0].max_page);
  return res.render(view+'table',{
    title:`Data for table ${tb_name}`,
    table_name:tb_name,
    column_name:column_name.rows,
    record: record.rows,
    table_active:true,
    page:page,
    next:page<max_page?page+1 : false,
    pages:Array.from({length: max_page}, (v, k) => k+1),
    previous:page>1?page-1:false
  })

};

exports.editTable = async (req,res)=>{

  const {tb_name} = req.params;
  const {recordId}= req.query;
  const data = await service.recordData(tb_name,recordId);
  
  delete (await data).rows[0].id;
  res.render(view+'editpage',{
    title:`Edit table ${tb_name}`,
    table_name:tb_name,
    record_id:recordId,
    record:data.rows[0],
    table_active:true
  })
}