const pool = require('../../models/dbconnect/dbconnect')

exports.findOne = (email)=>{
    return pool.query(
        `SELECT * FROM users
        WHERE email=$1`,[email]
    )
}

exports.register = (email,password,name,birthday,address)=>{
    return pool.query(
        `INSERT INTO users(email,password,name,birthday,address)
        VALUES ($1,$2,$3,$4,$5);`,[email,password,name,birthday,address]
    )
}