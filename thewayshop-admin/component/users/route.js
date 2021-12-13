const express = require('express');
const router = express.Router();
const tableCon = require('./controller');

router.get('/user', tableCon.viewTable);
router.get('/user/block', tableCon.postBlock);

module.exports = router;