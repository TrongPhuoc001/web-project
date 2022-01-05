const express = require('express');
const router = express.Router();
const controller = require('./controller');
/* GET home page. */
router.post('/exist',controller.accExist)
router.post('/resend', controller.resend);
router.post('/forgot',controller.forgot);
router.post('/wishlist',controller.postWishList);
router.get('/:user_id/wishlist',controller.getWishList);
router.get('/:user_id/cart',controller.getCart);
router.post('/cart',controller.postCart);
router.put('/cart',controller.updateCart);
module.exports = router;
