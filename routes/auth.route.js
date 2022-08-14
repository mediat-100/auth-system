const express = require('express');
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth.controller');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotPassword').post( forgotPassword);
router.route('/resetPassword/:token').put(resetPassword);

module.exports = router;
