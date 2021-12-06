
const service = require('./service');

const view = '../component/table/view/';
exports.viewTable = async function(req, res) {

  const {tb_name} = req.params;
  const column_name = await service.getColumnName(tb_name);
  const record = await service.getAllRecord(tb_name) 

  return res.render(view+'table',{
    title:`Data for table ${tb_name}`,
    table_name:tb_name,
    column_name:column_name.rows,
    record: record.rows,
    table_active:true
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