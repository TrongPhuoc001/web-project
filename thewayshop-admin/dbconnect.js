const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL||"postgres://uitendkmycauab:0ae0d30ef07df51093b342639e8c97e2f013b8f27c0e6637453bcf2438f8144f@ec2-34-194-100-156.compute-1.amazonaws.com:5432/d3qqmh6l4iie26",
  ssl:{
    rejectUnauthorized: false
  },
});
module.exports = pool;