const pool = require('../../models/dbconnect/dbconnect')


const limit = 8;
exports.getRecent = pool.query(
    `SELECT id,title,price,image,state FROM product
    WHERE is_delete = 'f'
    ORDER BY create_date DESC
    LIMIT $1;`,[limit]
)
exports.getTopSelling = pool.query(
    `SELECT id,title,price,image,state FROM product
    WHERE is_delete = 'f'
    ORDER BY sold DESC
    LIMIT $1;`,[limit]
)
exports.searchProduct = (q,tag,brand,priceLow,priceHigh,page)=>{
    return pool.query(
        `SELECT id,title,description,price,image,state FROM product
        WHERE lower(title) ~ lower($1)
        AND tag_id = ANY($2)
        AND brand ~ $3
        AND price BETWEEN $4 AND $5
        LIMIT $6 OFFSET $7;`,[q,tag,brand,priceLow,priceHigh,limit,(page-1)*limit]
    )
}