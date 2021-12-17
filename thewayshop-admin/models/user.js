const pool = require('./config/dbconnect');
exports.login = (username,password)=>{
    return pool.query(
    `SELECT * FROM manager WHERE username=$1 AND password=$2;`,[username,password]
    )
}
exports.getMember = pool.query(
        `SELECT username as name
        FROM manager;`
)


 