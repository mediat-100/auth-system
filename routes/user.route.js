const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const { Auth, restrictTo } = require('../middlewares/auth');

router.use(Auth);

router
  .route('/')
  .get(restrictTo('admin', 'manager'), getAllUsers)
  .get(restrictTo('admin', 'manager', 'staff'), getUser)
  .put(restrictTo('admin', 'manager'), updateUser)
  .delete(restrictTo('admin'), deleteUser);

module.exports = router;
