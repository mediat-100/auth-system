const User = require('../models/user');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) throw new Error('No user found');

    return res.status(200).json({
      status: 'success',
      countOfUsers: users.length,
      users,
    });
  } catch (err) {
    return res.status(200).json({
      status: 'fail',
      msg: err.message,
    });
  }
};
