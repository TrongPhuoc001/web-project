const pool = require('../../models/dbconnect/dbconnect')

const limit = 9;
exports.addRating = (user_id,product_id,star,content)=>{
    return pool.query(
        `INSERT INTO rating(user_id,product_id,star,content)
        VALUES ($1,$2,$3,$4) RETURNING *;`,[user_id,product_id,star,content]
    )
}


exports.userInfo = (user_id)=>{
    return pool.query(
        `SELECT name,image FROM users
        WHERE id = $1`,[user_id]
    )
}

exports.getRating = (product_id,page)=>{
    return pool.query(
        `SELECT name,image,star,content FROM rating,users
        WHERE product_id=$1
        AND user_id = users.id
        ORDER BY rating.create_at DESC
        LIMIT $2 OFFSET $3;`,[product_id,limit,(page-1)*limit]
    )
}