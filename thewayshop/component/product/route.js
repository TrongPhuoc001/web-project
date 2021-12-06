const express = require('express');
const router = express.Router();
const proCon = require('./controller');

/* GET home page. */
router.get('/', proCon.mainPage);
router.get('/:product_id',proCon.proDetail);
router.get('/tag/:tag_id',proCon.filterTag);
router.get('/category/:category_id',proCon.filterCategory);

module.exports = router;
