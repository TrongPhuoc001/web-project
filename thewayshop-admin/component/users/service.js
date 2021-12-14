const pool = require('../../models/config/dbconnect');
const limit = 9;

exports.maxPage = ()=> {
    return pool.query(
        `SELECT ceil(COUNT(*)/$1::numeric) as max_page FROM users;`,[limit]
    )
}
exports.getRecord = (page)=>{
    return pool.query(
        `SELECT users.id, users.email, users.name, users.address,users.balance,count(orders.id),sum(orders.total), users.is_delete
        FROM users left join orders on users.email = orders.email
        group by users.id, users.email, orders.fullname, users.address,users.balance, users.is_delete
        ORDER BY users.id ASC
        LIMIT $1 OFFSET $2;`,[limit,(page-1)*limit]
      )
}
exports.block = (id, is_block) => {
    return pool.query(
        `UPDATE users SET is_delete = $2 WHERE id = $1;`[id, is_block]
    )
}

exports.recordData = (id) => {
    return pool.query(
        `SELECT users.id, users.email, users.name, users.address,users.balance,count(orders.id) as "Total orders",sum(orders.total) as "Expended", users.is_delete
        FROM users left join orders on users.email = orders.email where users.id = $1
        group by users.id;`,[id]
    )
}
