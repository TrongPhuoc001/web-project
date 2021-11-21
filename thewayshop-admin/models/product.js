const pool = require('./config/dbconnect')
const limit = 8;
exports.getAll = (page)=>{
    return pool.query(
        `SELECT id,title,price,image FROM product
        WHERE is_delete = 'f'
        ORDER BY id DESC
        LIMIT $1 OFFSET $2;`,[limit,(page-1)*limit]
    )
}
exports.getRecent = pool.query(
    `SELECT id,title,price,image FROM product
    ORDER BY create_date ASC
    LIMIT 4;`
)
exports.getOne = (product_id)=>{
    return pool.query(
        `SELECT * FROM product
        WHERE id=$1`,[product_id]
    )
}

exports.maxPage = pool.query(
    `SELECT ceil(COUNT(*)/$1::numeric) as max_page FROM product;`,[limit]
)

exports.updatePro = (pro_id,data)=>{
    const {title,description,price,image,brand,tag_id,available,sold,is_delete} = data;
    return pool.query(
        `UPDATE product
        SET title=$1,
        description=$2,
        price=$3,
        image=$4,
        brand=$5,
        tag_id=$6,
        available=$7,
        sold=$8,
        is_delete=$9
        WHERE id=$10`,[title,description,price,image,brand,tag_id,available,sold,is_delete,pro_id]
    )
}