const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const { Auth, IsAdmin } = require('../middlewares/auth');

router.use(Auth, IsAdmin);
router
  .route('/users')
  .get(getAllUsers)
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
