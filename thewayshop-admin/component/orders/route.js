const express = require('express');
const router = express.Router();
const tableCon = require('./controller');
/* GET users listing. */
router.get('/', tableCon.viewOrders);
router.get('/edit', tableCon.editOrders);


module.exports = router;