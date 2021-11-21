const express = require('express');
const router = express.Router();
const productCon = require('../controller/product/mainController')
/* GET home page. */
router.get('/',productCon.get)
router.get('/add',productCon.getAddProduct);
router.get('/:product_id',productCon.getProduct)
router.post('/:product_id',productCon.postProduct)

module.exports = router;
