const service = require('./service');
const view = '../component/users/view/';

exports.viewTable = async function(req, res) {

    const page = parseInt(req.query.page)||1;
    //const column_name = {userId:'1111'}
    const record = await service.getRecord(page, 'user');
    let max_page = await service.maxPage('user');
    max_page = parseInt(max_page.rows[0].max_page);

    return res.render(view+'usertable',{
      title:"User",
      table_name:"User",
      //column_name:column_name.rows,
      record: record.rows,
      table_active:true,
      page:page,
      next:page<max_page?page+1 : false,
      pages:Array.from({length: max_page}, (v, k) => k+1),
      previous:page>1?page-1:false
    })
};

exports.editTable = async (req,res)=>{

  const {recordId}= req.query;
  const data = await service.recordData(tb_name,recordId);
  
  delete (await data).rows[0].id;
  res.render(view+'edituser',{
    title:`Edit User `,
    table_name:"User",
    record_id:recordId,
    record:data.rows[0],
    table_active:true
  })
}