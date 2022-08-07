const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/user.controller');
const { Auth, IsStaff } = require('../middlewares/auth');

router.use(Auth, IsStaff);
router.route('/users').get(getUser);

module.exports = router;
