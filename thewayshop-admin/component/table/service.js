const pool = require('../../models/config/dbconnect');

exports.getColumnName= (tb_name)=>{
    return pool.query(
        `SELECT column_name FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = '`+tb_name+`';`
    );
}

exports.getAllRecord = (tb_name)=>{
    return pool.query(
        `SELECT * FROM ${tb_name};`
      )
}

exports.recordData = (tb_name,record_id)=>{
    return pool.query(
        `SELECT * FROM   ${tb_name}  WHERE id =$1;`,[record_id]
    )
}