const router = require('express').Router();

const { createProduct, updateProduct, deleteProduct, getProduct, getAllProduct } = require('../Controllers/Product');
const { verifyTokenAndAdmin } = require('./VerifyToken')



router.route('/').post(verifyTokenAndAdmin, createProduct);

router.route('/:id').put(verifyTokenAndAdmin, updateProduct);

router.route('/:id').delete(verifyTokenAndAdmin, deleteProduct);

router.route('/find/:id').get(getProduct);

router.route('/').get(getAllProduct);

module.exports = router