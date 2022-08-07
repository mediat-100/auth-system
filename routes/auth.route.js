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
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:token', resetPassword);

module.exports = router;
