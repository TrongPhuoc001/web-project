const express = require('express');
const router = express.Router();
const pool = require('../dbconnect');
/* GET users listing. */
router.get('/:tb_name', async function(req, res, next) {
  const {tb_name} = req.params;
  const username = req.cookies.username;
  const column_name = pool.query(
    `SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = '`+tb_name+`';`
  );
  const record = pool.query(
    `SELECT * FROM ${tb_name};`
  );
  return res.render('table',{
    title:`Data for table ${tb_name}`,
    username: username,
    tables:['category','order_product','orders','product','tag','tag_category','users'],
    tasks:[
      {
        title:'Trang quản lý',
        percent: '90%'
      },
      {
        title:'Trang bán hàng',
        percent:'80%'
      }
    ],
    user_messages:[
      {
        name:'Phước Nguyễn',
        time:'Just Now',
        message:'heluu heluuuu'
      },
      {
        name:'Phương Nguyễn',
        time:'2 min',
        message:'beluu beluuuu beluuu'
      },
      {
        name:'Nguyên Đoàn',
        time:'3 min',
        message:'celuu celuuuu'
      },
      {
        name:'Monkey.D Luffy',
        time:'2 h',
        message:'leluu leluuuu'
      }
    ],
    table_name:tb_name,
    column_name:(await column_name).rows,
    record: (await record).rows
  })
  
});


module.exports = router;
