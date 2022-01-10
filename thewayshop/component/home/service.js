const pool = require('../../models/dbconnect/dbconnect')

exports.getRecent = pool.query(
    `SELECT id,title,price,image,state FROM product
    WHERE is_delete = 'f'
    ORDER BY create_date DESC
    LIMIT 4;`
)