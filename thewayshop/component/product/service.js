const pool = require('../../models/dbconnect/dbconnect')

exports.getProImage = (product_id)=>{
    return pool.query(
        `SELECT image FROM product_image
        WHERE product_id=$1`,[product_id]
    )
}