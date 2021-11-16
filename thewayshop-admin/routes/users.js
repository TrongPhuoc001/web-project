const express = require('express');
const pool = require('../dbconnect');
const router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  return res.render('login',{layout:false,title:'Login'});
});
router.post('/login', function(req, res, next) {
  const {username, password} = req.body;

  pool.query(
    `SELECT * FROM manager WHERE username=$1 AND password=$2;`,[username,password],
    (err,result)=>{
      if(err){
        console.log(err);
        return;
      }
      if(result.rows.length >0){
        res.cookie('username',username,{maxAge:900000});
        return res.cookie('is_authenticated',true,{maxAge:900000}).redirect('/');
      }
      else{
        return res.render('login',{
          layout:false,
          message:'Wrong username or password',
          title:'Login'
        });
      }
    }
  )
});
router.get('/logout', function(req, res, next) {
  return res.cookie('is_authenticated',false).redirect('/users/login');
});

module.exports = router;
