const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
  const username = req.cookies.username;
  res.render('index', { 
    title: 'TheWayShop Adminsite',
    username: username,
    tables:['category','order_product','orders','product','tag','tag_category','users'],
    tasks:[
      {
        title:'Trang quản lý',
        percent: '90%'
      },
      {
        title:'Trang bán hàng',
        percent:'80%'
      }
    ],
    user_messages:[ 
      {
        name:'Phước Nguyễn',
        time:'Just Now',
        message:'heluu heluuuu'
      },
      {
        name:'Phương Nguyễn',
        time:'2 min',
        message:'beluu beluuuu beluuu'
      },
      {
        name:'Nguyên Đoàn',
        time:'3 min',
        message:'celuu celuuuu'
      },
      {
        name:'Monkey.D Luffy',
        time:'2 h',
        message:'leluu leluuuu'
      }
    ],
    team_members:[
      {
        image:'/images/ui-sherman.jpg',
        name:'Phước Nguyễn',
        available:'available'
      },
      {
        image:'/images/ui-danro.jpg',
        name:'Đoàn Nguyên',
        available:'available'
      },
      {
        image:'/images/ui-zac.jpg',
        name:'Phương Nguyễn',
        available:'available'
      }
    ]
  });
});

module.exports = router;
