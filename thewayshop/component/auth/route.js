const express = require('express');
const router = express.Router();
const controller = require('./controller');
/* GET home page. */
router.get('/', controller.login);
router.get('/logout',controller.logout);
router.post('/login',controller.auth);
router.post('/register', controller.register);
module.exports = router;
