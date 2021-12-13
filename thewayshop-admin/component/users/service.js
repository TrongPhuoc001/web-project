const pool = require('../../models/config/dbconnect');
const limit = 9;

exports.maxPage = ()=> {
    return pool.query(
        `SELECT ceil(COUNT(*)/$1::numeric) as max_page FROM users;`,[limit]
    )
}
exports.getRecord = (page)=>{
    return pool.query(
        `SELECT * FROM users
        ORDER BY id ASC
        LIMIT $1 OFFSET $2;`,[limit,(page-1)*limit]
      )
}