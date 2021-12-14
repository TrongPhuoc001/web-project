const express = require('express');
const router = express.Router();
const controller = require('./controller');
/* GET home page. */
router.post('/resend', controller.resend);

module.exports = router;
