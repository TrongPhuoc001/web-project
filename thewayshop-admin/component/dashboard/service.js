const pool = require('../../models/config/dbconnect');
exports.login = (username,password)=>{
    return pool.query(
    `SELECT * FROM manager WHERE username=$1 AND password=$2;`,[username,password]
    )
}
exports.getMember = pool.query(
        `SELECT fullname as name,image
        FROM manager;`
)

exports.getVisit = (limit)=>{
    return pool.query(
        `SELECT * FROM 
                (SELECT * FROM visit
                ORDER BY _year DESC,
                _month DESC
                LIMIT $1) as res
        ORDER BY _month ASC;`,[limit]
    )
}

exports.soldByTag = pool.query(
    `SELECT  tag.name, COUNT(quantity) FROM order_product,product,tag WHERE order_product.product_id = product.id AND product.tag_id = tag.id GROUP BY tag.name;`
)

exports.monthIncome = pool.query(
    `SELECT TO_CHAR(create_date, 'MM') as month,SUM(total) FROM orders GROUP BY month ORDER BY month;`
)