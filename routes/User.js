
const router = require('express').Router();

const { Register, Login, updateUser, deleteUser, getUser, getAllUsers, getUserStats } = require('../Controllers/User');
const { VerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./VerifyToken');




router.route('/register').post(Register);

router.route('/login').post(Login);

router.route('/:id').put(verifyTokenAndAuthorization, updateUser);

router.route('/:id').delete(verifyTokenAndAuthorization, deleteUser);

router.route('/find/:id').get(verifyTokenAndAdmin, getUser);

router.route('/').get(verifyTokenAndAdmin, getAllUsers);

router.route('/stats').get(verifyTokenAndAdmin, getUserStats);


module.exports = router