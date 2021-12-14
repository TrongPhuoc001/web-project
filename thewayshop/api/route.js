const express = require('express');
const router = express.Router();

const accRoute = require('./account/route')
/* GET home page. */
router.use('/account', accRoute);

module.exports = router;
