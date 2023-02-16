const router = require('express').Router();

const { createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrders, getMonthlyIncome } = require('../Controllers/Order');
const { VerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./VerifyToken')



router.route('/').post(VerifyToken, createOrder);

router.route('/:id').put(verifyTokenAndAdmin, updateOrder);

router.route('/:id').delete(verifyTokenAndAdmin, deleteOrder);

router.route('/find/:userId').get(verifyTokenAndAuthorization, getUserOrder);

router.route('/').get( verifyTokenAndAdmin, getAllOrders);

router.route('/income').get( verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router