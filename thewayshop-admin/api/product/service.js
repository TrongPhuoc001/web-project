const pool = require('../../models/config/dbconnect')
const limit = 8;
exports.getAll = (page)=>{
    return pool.query(
        `SELECT id,title,price,image,available,sold FROM product
        WHERE is_delete = 'f'
        ORDER BY create_date DESC
        LIMIT $1 OFFSET $2;`,[limit,(page-1)*limit]
    )
}