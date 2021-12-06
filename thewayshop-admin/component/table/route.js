const express = require('express');
const router = express.Router();
const tableCon = require('./controller');
/* GET users listing. */
router.get('/:tb_name', tableCon.viewTable);

router.get('/:tb_name/edit', tableCon.editTable);


module.exports = router;
