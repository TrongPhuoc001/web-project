const express = require('express');

const router = express.Router();
const userRoute = require('./user/route')
const productRoute = require('./product/route');
/* GET users listing. */
router.use('/user',userRoute);
router.use('/product',productRoute);
module.exports = router;
