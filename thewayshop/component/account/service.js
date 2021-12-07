const pool = require('../../models/dbconnect/dbconnect')

exports.profile = (user_id)=>{
    return pool.query(
        `SELECT name,email,TO_CHAR(birthday, 'dd/mm/yyyy') as birthday,address,balance,image FROM users
        WHERE id=$1`,[user_id]
    )
}