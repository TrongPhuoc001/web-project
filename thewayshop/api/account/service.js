const pool = require('../../models/dbconnect/dbconnect')

exports.findOne = (email)=>{
    return pool.query(
        `SELECT * FROM users
        WHERE email=$1`,[email]
    )
}