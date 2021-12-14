const { PayloadTooLarge } = require('http-errors');
const pool = require('../../models/config/dbconnect')

const limit = 8;
exports.allManager = (page)=>{
    return pool.query(
        `SELECT * FROM manager LIMIT $1 OFFSET $2;`,[limit,(page-1)*limit]
    )
}
exports.maxPage = pool.query(
    `SELECT ceil(COUNT(*)/$1::numeric) as max_page FROM manager ;`,[limit]
)

exports.findOne = (id)=>{
    return pool.query(
        `SELECT id,fullname,username,TO_CHAR(birthday, 'yyyy-MM-DD') as birthday,salary,image FROM manager WHERE id=$1`,[id]
    )
}
exports.findOneUsername = (username)=>{
    return pool.query(
        `SELECT id,fullname,username,TO_CHAR(birthday, 'yyyy-MM-DD') as birthday,salary,image FROM manager WHERE username=$1`,[username]
    )
}

exports.add = (username,password,fullname,birthday,image,salary)=>{
    return pool.query(
        `INSERT INTO manager(username,password,fullname,birthday,image,salary)
        VALUES ($1,$2,$3,$4,$5,$6)`,[username,password,fullname,birthday,image,salary]
    )
}
exports.edit = (manager_id,username,birthday,salary)=>{
    return pool.query(
        `UPDATE manager SET username = $1, birthday = cast($2 as date), salary = $3 WHERE id= $4;`,[username,birthday,salary,manager_id]
    )
}