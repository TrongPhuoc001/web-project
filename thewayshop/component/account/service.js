const pool = require('../../models/dbconnect/dbconnect')

exports.profile = (user_id)=>{
    return pool.query(
        `SELECT name,email,TO_CHAR(birthday, 'yyyy-MM-DD') as birthday,address,balance,image FROM users
        WHERE id=$1`,[user_id]
    )
}

exports.editProfile = (name,birthday,address,image,user_id)=>{
    return pool.query(
        `UPDATE users
        SET name=$1, birthday = $2, address = $3, image = $4
        WHERE id = $5
        RETURNING name,email,TO_CHAR(birthday, 'yyyy-MM-DD') as birthday,address,balance,image;`,[name,birthday,address,image,user_id]
    )
}