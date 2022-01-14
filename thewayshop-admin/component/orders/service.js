const pool = require('../../models/config/dbconnect');
const limit = 9;
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
exports.maxPage = (tb_name)=> {
    return pool.query(
        `SELECT ceil(COUNT(*)/$1::numeric) as max_page FROM ${tb_name};`,[limit]
    )
}
exports.getRecord = (page, tb_name)=>{
    return pool.query(
        `SELECT * FROM ${tb_name}
        LIMIT $1 OFFSET $2;`,[limit,(page-1)*limit]
      )
}

exports.recordOrder = (page, record_id)=>{
    return pool.query(
        `SELECT order_product.order_id, order_product.product_id, product.title, order_product.quantity  
        FROM order_product, product 
        WHERE order_product.order_id =$1 and order_product.product_id = product.id LIMIT $2 OFFSET $3;`,[record_id, limit,(page-1)*limit]
    )
}