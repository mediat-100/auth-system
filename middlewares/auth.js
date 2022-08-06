const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Auth = async (req, res, next) => {
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

const IsAdmin = async (req, res, next) => {
  try {
    // check for authentication
    if (!req.user)
      throw new Error('You are not authorized to access this route');

    // check if the role is admin
    if (req.user.role !== 'admin')
      throw new Error('You do not have permission to access this route');

    next();
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

const IsManager = async (req, res, next) => {
  try {
    // check for authentication
    if (!req.user)
      throw new Error('You are not authorized to access this route');

    // check if the role is manager
    if (req.user.role !== 'manager')
      throw new Error('You do not have permission to access this route');

    next();
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

const IsStaff = async (req, res, next) => {
  // check for authentication
  try {
    if (!req.user)
      throw new Error('You are not authorized to access this route');

    // check if the role is staff
    if (req.user.role !== 'staff')
      throw new Error('You do not have permission to access this route');

    next();
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

module.exports = {
  Auth,
  IsAdmin,
  IsManager,
  IsStaff,
};
