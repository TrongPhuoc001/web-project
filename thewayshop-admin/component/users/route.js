const express = require('express');
const router = express.Router();
const tableCon = require('./controller');

router.get('/user', tableCon.viewTable);
router.get('/user/edit', tableCon.editTable);

module.exports = router;