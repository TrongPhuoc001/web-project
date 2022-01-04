const pool = require('../../models/dbconnect/dbconnect')

exports.findOne = (email)=>{
    return pool.query(
        `SELECT * FROM users
        WHERE email=$1`,[email]
    )
}

exports.addWishList = (user_id,pro_id)=>{
    pool.query(
        `INSERT INTO wishlist(user_id,product_id)
        VALUES ($1,$2);`,[user_id,pro_id]
    )
}

exports.getWishlist = (user_id,page)=>{
    return pool.query(
        `SELECT id,title,image,price FROM product,wishlist 
        WHERE product_id=id
        AND user_id=$1
        LIMIT $2 OFFSET $3;`,[user_id,6,(page-1)*6]
    )
}