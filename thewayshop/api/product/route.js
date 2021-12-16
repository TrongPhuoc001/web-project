const express = require('express');
const router = express.Router();

const controller = require('./controller')
/* GET home page. */
router.get('/rating', controller.getRating);
router.post('/rating', controller.postRating);

module.exports = router;
