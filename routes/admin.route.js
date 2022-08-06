const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/user.controller');
const { Auth, IsAdmin } = require('../middlewares/auth');

router.route('/users').get(Auth, IsAdmin, getAllUsers);

module.exports = router;
