const router = require('express').Router();

const { createCart, updateCart, deleteCart, getUserCart, getAllCarts} = require('../Controllers/Cart');
const { VerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./VerifyToken')



router.route('/').post(VerifyToken, createCart);

router.route('/:id').put(verifyTokenAndAuthorization, updateCart);

router.route('/:id').delete(verifyTokenAndAuthorization, deleteCart);

router.route('/find/:userId').get(verifyTokenAndAuthorization, getUserCart);

router.route('/').get( verifyTokenAndAdmin, getAllCarts);

module.exports = router