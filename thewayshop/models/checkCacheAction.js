const pool = require('./dbconnect/dbconnect');

exports.checkClear = pool.query(
        `SELECT action FROM cache_action WHERE name = 'clear';`
    );

exports.setClear = pool.query(
    `UPDATE cache_action SET action=false WHERE name='clear';`
);