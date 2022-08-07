const express = require('express');
const router = express.Router();
const { getUser, getAllUsers } = require('../controllers/user.controller');
const { Auth, IsManager } = require('../middlewares/auth');

router.use(Auth, IsManager);
router.route('/users').get(getAllUsers).get(getUser);

module.exports = router;
