const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.Auth = async (req, res, next) => {
  try {
    // check if token exists
    const token = req.headers['auth-token'];

    if (!token) throw new Error('Access restricted');

    // if token exist, verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) throw new Error('Invalid Token');

    // check if user still exists
    const user = await User.findById(decoded);

    if (!user) throw new Error('User not found, please sign up');

    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin','manager', 'staff']--> allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(400).json({
        status: 'fail',
        msg: 'You do not have permission to perform this action',
      });
    }

    next();
  };
};
