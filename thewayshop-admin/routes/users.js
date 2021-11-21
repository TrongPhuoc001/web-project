const express = require('express');

const router = express.Router();
const loginCon = require('../controller/user/loginController')
const logoutCon = require('../controller/user/logoutController')
/* GET users listing. */
router.get('/login', loginCon.get);
router.post('/login', loginCon.post);
router.get('/logout', logoutCon.get);

module.exports = router;
